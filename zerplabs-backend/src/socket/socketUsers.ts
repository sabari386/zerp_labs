"use strict";
import { injectable } from "inversify";
import { ISocketUsers } from "./interface";




@injectable()
class SocketUsers implements ISocketUsers {
    users = [];

    // Join user to chat
    async userJoin(id, username, userId, room) {
        if(userId) {
            const index = this.users.findIndex(x => x.userId === userId) 
            if(index === -1) {
                const user = { id, username, userId, room };
                this.users.push(user);
                return user;
            }
        }
    }

    // Get current user
    async getCurrentUser(id) {
        return this.users.find(user => user.id === id);
    }

    // User leaves chat
    async userLeave(id) {
    const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            return this.users.splice(index, 1)[0];
        }
    }

    // Get room users
    async getRoomUsers(room) {
        return this.users.filter(user => user.room === room);
    }

    async formatMessage(username, text) {
        return {
          username,
          text,
        };
    }

}

export default SocketUsers;