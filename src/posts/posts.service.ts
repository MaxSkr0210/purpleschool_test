import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePostCommand } from './commands/create-post/create-post.command';
import { UpdatePostCommand } from './commands/update-post/update-post.command';
import { DeletePostCommand } from './commands/delete-post/delete-post.command';
import { GetPostByIdQuery } from './queries/get-post-by-id/get-post-by-id.query';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createPost(dto: CreatePostDto, userId: number) {
    return this.commandBus.execute(new CreatePostCommand(dto, userId));
  }

  async updatePost(postId: number, dto: UpdatePostDto, userId: number) {
    return this.commandBus.execute(new UpdatePostCommand(postId, dto, userId));
  }

  async deletePost(postId: number, userId: number) {
    return this.commandBus.execute(new DeletePostCommand(postId, userId));
  }

  async getPostById(postId: number) {
    return this.queryBus.execute(new GetPostByIdQuery(postId));
  }
}
