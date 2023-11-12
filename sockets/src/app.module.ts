import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './models/posts/entities/chat.entity';
import { ChatModule } from './models/posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'user',
      password: 'pass',
      database: 'postgres',
      entities: [Chat],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Chat]),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
