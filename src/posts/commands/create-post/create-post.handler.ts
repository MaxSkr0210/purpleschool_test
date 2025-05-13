import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreatePostCommand } from './create-post.command';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(private prisma: PrismaService) {}

  async execute(command: CreatePostCommand) {
    const { dto, userId } = command;
    return this.prisma.post.create({
      data: {
        title: dto.title,
        content: dto.content,
        authorId: userId,
      },
    });
  }
}
