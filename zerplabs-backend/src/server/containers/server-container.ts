
"use strict";
import { Container } from "inversify";
/**
 * Import Types for form class
 */

import {
    IServer,
    serverTypes
} from "../interface";

/**
 * Import server
 */
import Server from '../index'

const ServerContainer = new Container();
ServerContainer.bind<IServer>(serverTypes.IServer).to(Server);




export default ServerContainer;