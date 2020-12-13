//import * as mongoose from 'mongoose'
import { Document, Schema, Model, model, connection, pluralize } from 'mongoose';
import { initialize, plugin } from 'mongoose-auto-increment'

initialize(connection);
pluralize(null)

export interface IAppointment extends Document {
    patient_id: string;
    appointment_date: Date;
    appointment_time: String; 
    appointment_status: string; 
}


/*  db schema - Courses*/
const appointmentSchema:Schema = new Schema({
    patient_id: {
        type: Number,
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

appointmentSchema.plugin(plugin, {model: 'appointment_details', startAt: 1});
export const appointmentModal: Model<IAppointment> = model<IAppointment>('appointment_details', appointmentSchema);

export default appointmentModal;








