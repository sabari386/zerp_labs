//import * as mongoose from 'mongoose'
import { Document, Schema, Model, model, connection, pluralize } from 'mongoose';
import { initialize, plugin } from 'mongoose-auto-increment'

initialize(connection);
pluralize(null)

export interface IPatient extends Document {
    fullName: string;
    email: string;
    mobileNo: string;
    gender: string;
    address: string;
    appointment_date: Date;
    appointment_time: Date; 
    appointment_status: string; 
}


/*  db schema - Courses*/
const patientSchema:Schema = new Schema({
    fullName: {
        type: String,
        default: ""
    },
    age: {
        type: Number,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    mobileNo: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: "", 
    },
    address: {
        type: String,
        default: "",
    },
    appointment_date:{
        type: String
    },
    appointment_time:{
        type: String
    },
    appointment_status:{
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },  
});

patientSchema.plugin(plugin, {model: 'patient_details', startAt: 1});
export const patientModal: Model<IPatient> = model<IPatient>('patient_details', patientSchema);

export default patientModal;








