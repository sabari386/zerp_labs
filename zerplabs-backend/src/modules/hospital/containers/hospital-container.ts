
"use strict";
import { Container } from "inversify";
/**
 * Import Types for form class
 */

import {
    IAddPatient,
    patientTypes
} from "../interface";

/**
 * Import server
 */
import AddPatient from '../create';


const patientContainer = new Container();
patientContainer.bind<IAddPatient>(patientTypes.IAddPatient).to(AddPatient);


export default patientContainer;