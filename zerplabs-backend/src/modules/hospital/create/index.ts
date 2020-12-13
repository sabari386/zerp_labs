'use strict';

import { injectable, inject } from "inversify";
import { IAddPatient } from "../interface";

import { Model } from "mongoose";
import { IPatient } from "../../../modals/hospital/patient/index";
import { IAppointment } from "../../../modals/hospital/appointment/index";
import { IAvailableSlot } from "../../../modals/hospital/slots/index";

@injectable()
class AddPatient implements IAddPatient {
    patientModal: Model<IPatient>
    appointmentModal: Model<IAppointment>
    availableSlotModal: Model<IAvailableSlot>

    addPatient = async (data, options, Modals) => {

        this.patientModal = Modals.patientModal;
        this.appointmentModal = Modals.appointmentModal;
        this.availableSlotModal = Modals.availableSlotModal;
        
        var patientDetails = data.body;

        const patientRecord = await this.patientModal.create(patientDetails);

        if (patientRecord) {
                return {
                    status: true,
                    Msg: "patient added Successfully"
                }
            
        } else {
            return {
                status: false,
                Msg: "you cannot add patient now",
            }
        }
    }

    getPatientDetails = async (data, options, Modals) => {
        this.patientModal = Modals.patientModal;
        const resp = await this.patientModal.find();
        if (resp) {
            return {
                status: true,
                Msg: "Patient Details fetched Successfully",
                data: resp
            }
        } else {
            return {
                status: false,
                Msg: "Patient Details fetching failed"
            }
        }
    }

    addAppointment = async (data, options, Modals) => {
        this.appointmentModal = Modals.appointmentModal;
        const resp = await this.appointmentModal.create(data.body);
        if (resp) {
            return {
                status: true,
                Msg: "Appointment Created Successfully",
                data: resp
            }
        } else {
            return {
                status: false,
                Msg: "Appointment creation failed",
                data: resp
            }
        }
    }

    getAppointmentByDate = async (data, options, Modals) => {
        this.appointmentModal = Modals.appointmentModal;
        this.patientModal = Modals.patientModal;
        const resp = await this.patientModal.find({ "appointment_date": options.appointment_date });
        if (resp) {
            return {
                status: true,
                Msg: "Appointment fetched Successfully",
                data: resp
            }
        } else {
            return {
                status: false,
                Msg: "Appointment fetching failed",
                data: resp
            }
        }
    }

    getAvailableSlots = async (data, options, Modals) => {
        this.availableSlotModal = Modals.availableSlotModal;
        const resp = await this.availableSlotModal.find();        
        if (resp) {
            return {
                status: true,
                Msg: "available slots fetched Successfully",
                data: resp,
                
            }
        } else {
            return {
                status: false,
                Msg: "available slots fetching failed",
                data: resp
            }
        }
    }

    getAvailableSlotsByDate = async (data, options, Modals) => {
        this.availableSlotModal = Modals.availableSlotModal;
        const resp = await this.availableSlotModal.find({ "available_date": options.available_date });
        if (resp) {
            return {
                status: true,
                Msg: "available slots fetched Successfully",
                data: resp
            }
        } else {
            return {
                status: false,
                Msg: "available slots fetching failed",
                data: resp
            }
        }
    }

    addAvailableSlots = async (data, options, Modals) => {
        var starttime = data.body.startTime;
        var interval = "30";
        var endtime = data.body.endTime;
        var timeslots = [starttime];
        this.availableSlotModal = Modals.availableSlotModal;
        function addMinutes(time, minutes) {
            var date = new Date(new Date('01/01/2015 ' + time).getTime() + minutes * 60000);
            var tempTime = ((date.getHours().toString().length == 1) ? '0' + date.getHours() : date.getHours()) + ':' +
                ((date.getMinutes().toString().length == 1) ? '0' + date.getMinutes() : date.getMinutes()) + ':' +
                ((date.getSeconds().toString().length == 1) ? '0' + date.getSeconds() : date.getSeconds());
            return tempTime;
        }        
        while (starttime != endtime) {
            starttime = addMinutes(starttime, interval);
            timeslots.push(starttime);}
            
        const availableSlots = await this.availableSlotModal.create({
            available_date: data.body.available_date,
            available_slots: timeslots
        });

        if (availableSlots) {
            return {
                status: true,
                Msg: "slots added Successfully",
                data: availableSlots
            }
        } else {
            return {
                status: false,
                Msg: "slots adding failed",
                data: availableSlots
            }
        }
    }
}

export default AddPatient;
