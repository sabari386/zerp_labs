
"use strict";
import { Container } from "inversify";
/**
 * Import Types for form class
 */

import {
   IMongoDB,
   dbTypes
} from "../interfaces";

/**
 * Import server
 */
import MongoDb from '../mongoDb'

const dbContainer = new Container();
dbContainer.bind<IMongoDB>(dbTypes.IMongoDB).to(MongoDb);

export default dbContainer;