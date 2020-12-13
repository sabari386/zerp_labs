/**
 * Create interface
 */
export interface IAddPatient {
    addPatient(data, options, Modals): Promise<any>
}



export const patientTypes = {
    IAddPatient: Symbol.for("IAddPatient"),
}