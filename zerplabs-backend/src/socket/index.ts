'use strict';
import { injectable, inject } from "inversify";
import { ISocketIo, ISocketUsers, socketTypes } from "./interface";

import { Model } from "mongoose";

/**
 * Import socket users
 */
import SocketUser from './socketUsers'
import { ILiveChat } from "./interface";

let socketio;

@injectable()
class SocketIo implements ISocketIo {
    socketUsers: ISocketUsers
    LiveChat: ILiveChat
    constructor(
        @inject(socketTypes.ISocketUsers) socketUsers: SocketUser,
    ) {
        this.socketUsers = socketUsers
    }
    connection = async(io) => {  
        socketio = io      
        const botName = 'Conference';

        // Run when client connects
        io.on('connection', socket => {
            socket.on('joinRoom', async ({ userId, username, room }) => {
                const user = await this.socketUsers.userJoin(socket.id, username, userId, room);
                if(user) {
                    socket.join(user.room);

                    // Welcome current user
                    socket.emit('message', this.socketUsers.formatMessage(botName, 'Welcome to Conference!'));

                    // Broadcast when a user connects
                    socket.broadcast
                    .to(user.room)
                    .emit(
                        'message',
                        await this.socketUsers.formatMessage(botName, `${user.username} has joined the chat`)
                    );

                    // Send users and room info
                    io.to(user.room).emit('roomUsers', {
                        room: user.room,
                        users: await this.socketUsers.getRoomUsers(user.room)
                    });
                }
            });

            // Listen for chatMessage
            socket.on('chatMessage', async msg => {
                const user = await this.socketUsers.getCurrentUser(socket.id);
                const input = { 
                    userId: user.userId,
                    body: msg,
                    conferenceId: user.room 
                }
                const output = await this.LiveChat.conversation(input, "")
                io.to(user.room).emit('message', output);
            });

            // Listen for chatMessage
            socket.on('whiteBoardMsgs', async msg => {
                const user = await this.socketUsers.getCurrentUser(socket.id);
                const output = { 
                    userId: user.userId,
                    data: msg,
                    conferenceId: user.room 
                }
                socket.broadcast.to(user.room).emit('ReceiveWhiteBoard', output);
            });

            //white board action 
            socket.on('toggleWhiteBoard', async msg => {
                const user = await this.socketUsers.getCurrentUser(socket.id);
                const output = { 
                    userId: user.userId,
                    data: msg,
                    conferenceId: user.room 
                }
                socket.broadcast.to(user.room).emit('ReceiveWhiteBoardAction', output);
            })

            // Runs when client disconnects
            socket.on('disconnect', async() => {
                const user = await this.socketUsers.userLeave(socket.id);

                if (user) {
                io.to(user.room).emit(
                    'message',
                    await this.socketUsers.formatMessage(botName, `${user.username} has left the chat`)
                );

                // Send users and room info
                io.to(user.room).emit('roomUsers', {
                    room: user.room,
                    users: await this.socketUsers.getRoomUsers(user.room)
                });
                }
            });
        });
    }

    async ioEmitter() {
        return socketio;
    }
}

export default SocketIo;
