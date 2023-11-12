import { Body, Controller, Post } from '@nestjs/common';
import { Chat } from './entities/chat.entity';
import { PostsService } from './posts.service';

@Controller()
export class UserController {
  constructor(private readonly postsService: PostsService) {}

  @Post('/getAllMessages')
  getAllMessages(@Body() data): Promise<Chat[]> {
    return this.postsService.getAllMessages(data);
  }
}
