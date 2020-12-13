"use strict";

import { Router } from 'express';

const router = Router();


/**
 * Import user controller
 */
import hospitalController from "../../controllers/hospital"

router.post('/addPatientDetails',hospitalController.addPatientDetails);

router.post('/addAppointmentDetails',hospitalController.addAppointmentDetails);

router.post('/addAvailableSlots',hospitalController.addAvailableSlots);

router.get('/getAvailableSlots',hospitalController.getAvailableSlots);

router.get('/getAvailableSlotsByDate/:available_date',hospitalController.getAvailableSlotsByDate);

router.get('/getAppointmentByDate/:appointment_date',hospitalController.getAppointmentByDate);

router.get('/getPatientDetails',hospitalController.getPatientDetails);






export default router;