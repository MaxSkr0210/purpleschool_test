import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostHandler } from './commands/create-post/create-post.handler';
import { UpdatePostHandler } from './commands/update-post/update-post.handler';
import { DeletePostHandler } from './commands/delete-post/delete-post.handler';
import { GetPostByIdHandler } from './queries/get-post-by-id/get-post-by-id.handler';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [CqrsModule, AuthModule],
  controllers: [PostsController],
  providers: [
    PostsService,
    PrismaService,
    CreatePostHandler,
    UpdatePostHandler,
    DeletePostHandler,
    GetPostByIdHandler,
  ],
})
export class PostModule {}
