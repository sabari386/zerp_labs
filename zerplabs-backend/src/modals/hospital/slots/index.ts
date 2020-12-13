//import * as mongoose from 'mongoose'
import { Document, Schema, Model, model, connection, pluralize } from 'mongoose';
import { initialize, plugin } from 'mongoose-auto-increment'

initialize(connection);
pluralize(null)

export interface IAvailableSlot extends Document {
    available_date: Date;
    available_slots: Array<any>; 
}


/*  db schema - Courses*/
const availableSlotSchema:Schema = new Schema({    
    available_date:{
        type: String
    },
    available_slots:{
        default: [],
        type:Array
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    } 
});

availableSlotSchema.plugin(plugin, {model: 'slot_details', startAt: 1});
export const availableSlotModal: Model<IAvailableSlot> = model<IAvailableSlot>('slot_details', availableSlotSchema);

export default availableSlotModal;








