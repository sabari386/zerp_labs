"use strict";
import "reflect-metadata";
import * as express from 'express';
import { Response } from 'express';
import { injectable, inject } from "inversify";
import { json } from 'body-parser';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as SocketIo from 'socket.io'
import { createServer as localServer } from 'http'
import { createServer } from 'https'
import * as cookieParser from 'cookie-parser'
import * as vhost from 'vhost'
import * as fileUpload from 'express-fileupload'
const app = express();
const { PORT = 9000, NODE_ENV } = process.env; 
var cors = require('cors');



/**
 * Import server interface
 */
import { IServer, IRequest } from "./interface";

/**
 * Import database connection
 */
import {
  IMongoDB,
  dbTypes
} from "../database/interfaces"
import MongoDb from "../database/mongoDb";

/**
 * Import socket container
 */
import {
  ISocketIo,
  socketTypes
} from '../socket/interface';
import SocketConection from '../socket'

/**
 * Import container
 */
import MergeServerConatainer from './containers/merge-containers';

/**
 * Importc course route
 */
import hospitalRoute from '../routes/hospital/patient';

const virtualHosts = JSON.parse(readFileSync(join(process.cwd(), '/src/server/vhosts.json'), 'utf8'));

const currentPath = process.cwd();

@injectable()
class Server implements IServer {

  app: express.Application
  db: IMongoDB
  sockets: ISocketIo
	constructor(
    @inject(dbTypes.IMongoDB) db: MongoDb,
    @inject(socketTypes.ISocketIo) sockets: SocketConection
  ) {
    this.app = app
    this.db = db
    this.sockets = sockets
    this.listen();
    this.routes()
	}
	
	listen = async() => {
		if (require.main === module) {
      let server
      if(NODE_ENV === "production") { 
        server = createServer(this.app)
      } else {
        server = localServer(this.app)
      }

      const io = SocketIo(server)
      await this.sockets.connection(io)
      server.listen(PORT, () => {
          console.log('server started at http://localhost:'+PORT);
          this.db.connection().then(res => {
            console.log("Mongodb connected successfully")
          })
        });
    }
  }
  
  routes = async() => {

    // middleware
    this.app.use(cors());
    this.app.use(json());
    this.app.use(cookieParser())
    this.app.use(fileUpload());
    this.app.use('/hospital', hospitalRoute);
    

    this.app.use(vhost('*.localhost', function handle (req, res, next) {
      console.dir(req.protocol) 
      res.setHeader("Access-Control-Allow-Origin:*");
      req['domain'] = req.vhost.host
      req['proto'] = req.protocol
      next();
    }))
    
  }
}

MergeServerConatainer.resolve(Server)




export default Server;