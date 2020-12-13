

import { Container } from "inversify";

/**
 * User container
 */
import patientContainer from "./hospital-container";


const MergePatientConatainer = patientContainer;
export default MergePatientConatainer