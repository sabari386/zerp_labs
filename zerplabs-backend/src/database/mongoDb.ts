
import { connect } from "mongoose"

/**
 * Import interface
 */
import { IMongoDB } from "./interfaces";
import { injectable } from "inversify";

const { MONGODB_URI } = process.env;






@injectable()
class MongoDb implements IMongoDB {
    connection = async() => {
        connect(MONGODB_URI, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
         }).then(async () => {
             
         })
    }
}

export default MongoDb;
