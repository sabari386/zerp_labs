
"use strict";
import { Container } from "inversify";
/**
 * Import Types for form class
 */

import {
    ISocketIo,
    ISocketUsers,
    socketTypes
} from "../interface";

/**
 * Import server
 */
import SocketIo from '../index'

/**
 * Import socket users
 */
import SocketUsers from '../socketUsers';


const SocketContainer = new Container();
SocketContainer.bind<ISocketIo>(socketTypes.ISocketIo).to(SocketIo);
SocketContainer.bind<ISocketUsers>(socketTypes.ISocketUsers).to(SocketUsers);




export default SocketContainer;