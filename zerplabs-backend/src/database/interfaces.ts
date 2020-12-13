/**
 * db interfaces
 */
export interface IMongoDB {
    connection(): Promise<any>
}

/**
 * database Types
 */
export const dbTypes = {
    IMongoDB: Symbol.for("IMongoDB"),
}