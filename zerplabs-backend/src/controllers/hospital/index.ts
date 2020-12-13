
"use strict";
import * as Joi from '@hapi/joi';

/**
 * Import user container
 */
import MergePatientConatainer from "../../modules/hospital/containers/merge-containers";

/**
 * Import interface
 */
import {
    IHospitalController,
} from './interface'

import AddPatient from '../../modules/hospital/create/index';

import patientModal from '../../modals/hospital/patient/index'
import appointmentModal from '../../modals/hospital/appointment/index'
import availableSlotModal from '../../modals/hospital/slots/index'


const hospitalController: IHospitalController = {

    addPatientDetails: async (req, res, next) => {
        const methods = MergePatientConatainer.resolve(AddPatient)
        const Modals = { patientModal,appointmentModal,availableSlotModal }
        const options = {}
        const func = await methods.addPatient(req, options, Modals)
        res.json(func);
    },
    getPatientDetails: async (req, res, next) => {
        const methods = MergePatientConatainer.resolve(AddPatient)
        const Modals = { patientModal }
        const options = {}
        const func = await methods.getPatientDetails(req, options, Modals)
        res.json(func);
    },
    addAppointmentDetails: async (req, res, next) => {
        const methods = MergePatientConatainer.resolve(AddPatient)
        const Modals = { appointmentModal }
        const options = {}
        const func = await methods.addAppointment(req, options, Modals)
        res.json(func);
    },
    getAppointmentByDate: async (req, res, next) => {
        const methods = MergePatientConatainer.resolve(AddPatient)
        const Modals = { appointmentModal,patientModal }
        const options = {appointment_date:req.params.appointment_date}
        const func = await methods.getAppointmentByDate(req, options, Modals)
        res.json(func);
    },
    getAvailableSlots: async (req, res, next) => {
        const methods = MergePatientConatainer.resolve(AddPatient)
        const Modals = { availableSlotModal }
        const options = {}
        const func = await methods.getAvailableSlots(req, options, Modals)
        res.json(func);
    },
    getAvailableSlotsByDate: async (req, res, next) => {
        const methods = MergePatientConatainer.resolve(AddPatient)
        const Modals = { availableSlotModal }
        const options = {available_date:req.params.available_date}
        const func = await methods.getAvailableSlotsByDate(req, options, Modals)
        
        res.json(func);
    },
    addAvailableSlots: async (req, res, next) => {
        const methods = MergePatientConatainer.resolve(AddPatient)
        const Modals = { availableSlotModal }
        const options = {}
        const func = await methods.addAvailableSlots(req, options, Modals);
        res.json(func);
    }

}

export default hospitalController;