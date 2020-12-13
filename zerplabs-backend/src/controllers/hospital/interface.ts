

export interface IHospitalController {
    addPatientDetails(req, res, next): Promise<any>
    addAppointmentDetails(req, res, next): Promise<any>
    getAvailableSlots(req, res, next): Promise<any>
    addAvailableSlots(req, res, next): Promise<any>
    getAvailableSlotsByDate(req, res, next): Promise<any>
    getAppointmentByDate(req, res, next): Promise<any>
    getPatientDetails(req, res, next): Promise<any>
}