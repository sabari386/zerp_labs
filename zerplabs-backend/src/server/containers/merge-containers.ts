"use strict";

import { Container } from "inversify";

/**
 * db container
 */
import dbContainer from "../../database/containers/db-container";


/**
 * server container
 */
import ServerContainer from "../containers/server-container";

/**
 * Socket container
 */
import SocketContainer from '../../socket/containers/socket-container'


const MergeDBConatainer = Container.merge(dbContainer, ServerContainer);
const MergeServerConatainer = Container.merge(MergeDBConatainer, SocketContainer);
export default MergeServerConatainer