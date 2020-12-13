import { Request } from 'express';
/**
 * Extend Request
 */
export interface IRequest extends Request {
  domain: string
}
 
 
 /**
  * server interface
  */

  export interface IServer {
    listen(): Promise<any>
    routes(): Promise<any>
  }

  /**
   * server types
   */
  export const serverTypes = {
    IServer: Symbol.for("IServer"),
  }