import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { Server, Socket } from 'socket.io';
import { HttpService } from '@nestjs/axios/dist';

import getAllMessages from './getAllMessages';

let index = 0;
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class PostsService implements OnGatewayConnection {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    private readonly httpService: HttpService,
  ) {}
  @WebSocketServer()
  server: Server;

  async getAllMessages(data): Promise<Chat[]> {
    const { fromUser, fromUserFirstName, toUserFirstName } = data;

    const senderSocketId = this.usersSockets[fromUser];

    const res = await getAllMessages(this.chatRepository, data);

    res.forEach((messageObj) => {
      if (messageObj.fromUser === fromUser) {
        console.log(messageObj.fromUser === fromUser);
        // this.server.to(recieverSocketId).emit('renderMessage', {
        //   fromUserFirstName,
        //   message:
        //     '<<' + messageObj.fromUser === fromUser
        //       ? fromUserFirstName
        //       : toUserFirstName + '>> ' + messageObj.message,
        //   key: index++,
        // });
        // this.server.to(senderSocketId).emit('renderMessage', {
        //   fromUserFirstName,
        //   message:
        //     '<<' + messageObj.fromUser === fromUser
        //       ? fromUserFirstName
        //       : toUserFirstName + '>> ' + messageObj.message,
        //   key: index++,
        // });
        // this.server.to(recieverSocketId).emit('renderMessage', {
        //   fromUserFirstName,
        //   message: '<<' + fromUserFirstName + '>> ' + messageObj.message,
        //   key: index++,
        // });
        this.server.to(senderSocketId).emit('renderMessage', {
          fromUserFirstName,
          message: '<<' + fromUserFirstName + '>> ' + messageObj.message,
          key: index++,
        });

        // console.log(
        //   'file: posts.service.ts:76 ~ PostsService ~ res.forEach ~ fromUser:',
        //   fromUser,
        // );
        // console.log(
        //   'file: posts.service.ts:76 ~ PostsService ~ res.forEach ~ messageObj.fromUser:',
        //   messageObj.fromUser,
        // );
        // console.log(
        //   messageObj.fromUser === fromUser ? fromUserFirstName : toUserFirstName,
        // );
      } else {
        console.log('ELSE ____________________________');

        // this.server.to(recieverSocketId).emit('renderMessage', {
        //   toUserFirstName,
        //   message: '<<' + toUserFirstName + '>> ' + messageObj.message,
        //   key: index++,
        // });
        this.server.to(senderSocketId).emit('renderMessage', {
          toUserFirstName,
          message: '<<' + toUserFirstName + '>> ' + messageObj.message,
          key: index++,
        });
      }
    });

    return res;
  }

  async sendPostRequest(endpoint: string, data: object) {
    const baseUrl = 'http://app:3001';
    const url = baseUrl + endpoint;
    try {
      await this.httpService.post(url, data).toPromise();
      console.log('Response:', 'Successfully');
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  userId = '';

  usersSockets = {};

  async handleConnection(client: Socket) {
    console.log('User connected:', client.id);
    const userId = client.handshake.query.userId as string;
    const accesToken = client.handshake.query.accesToken as string;

    this.usersSockets[userId] = client.id;

    const data = { userId, accesToken, setOnline: true };
    // await this.sendPostRequest('/updateUser', data);

    this.server.emit('userConnect', {
      message: 'from server',
      socketId: client.id,
      userId,
    });
  }

  async handleDisconnect(client: any) {
    const accesToken = client.handshake.query.accesToken as string;
    const userId = client.handshake.query.userId as string;

    const data = { userId, accesToken, setOnline: false };
    // await this.sendPostRequest('/updateUser', data);
  }

  @SubscribeMessage('sendMessage')
  async onCreatePost(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: any,
  ) {
    const { fromUser, toUser, message, fromUserFirstName } = body;

    const recieverSocketId = this.usersSockets[toUser];

    const senderSocketId = this.usersSockets[fromUser];

    this.server.to(recieverSocketId).emit('renderMessage', {
      fromUserFirstName,
      message: '<<' + fromUserFirstName + '>> ' + body.message,
      key: index++,
    });
    this.server.to(senderSocketId).emit('renderMessage', {
      fromUserFirstName,
      message: '<<' + fromUserFirstName + '>> ' + body.message,
      key: index++,
    });
    const messageObj = new Chat();
    messageObj.fromUser = fromUser;
    messageObj.toUser = toUser;
    messageObj.message = message;

    await this.chatRepository.save(messageObj);
  }
}
