import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';

import { UserController } from './posts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Chat]), HttpModule],

  controllers: [UserController],
  providers: [PostsService],
  exports: [PostsService],
})
export class ChatModule {}
