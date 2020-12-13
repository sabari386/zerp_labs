
/**
 * interface
 */
export interface ISocketIo {
    connection(io): Promise<any>
    ioEmitter(): Promise<any>
}


/**
 * Socket users
 */
export interface ISocketUsers {
    userJoin(id, username, userId, room): Promise<any>
    getCurrentUser(id): Promise<any>
    userLeave(id): Promise<any>
    getRoomUsers(room): Promise<any>
    formatMessage(username, text): Promise<any>
}

/**
 * Live chat
 */
export interface ILiveChat {
    conversation(data, options): Promise<any>
}

/**
 * socket types
 */
export const socketTypes = {
    ISocketIo: Symbol.for("ISocketIo"),
    ISocketUsers: Symbol.for("ISocketUsers"),
    ILiveChat: Symbol.for("ILiveChat"),
}