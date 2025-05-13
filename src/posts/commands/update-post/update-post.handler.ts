import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../prisma/prisma.service';
import { UpdatePostCommand } from './update-post.command';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

@CommandHandler(UpdatePostCommand)
export class UpdatePostHandler implements ICommandHandler<UpdatePostCommand> {
  constructor(private prisma: PrismaService) {}

  async execute(command: UpdatePostCommand) {
    const { postId, dto, userId } = command;

    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (post.authorId !== userId) {
      throw new ForbiddenException('You can edit only your own posts');
    }

    return this.prisma.post.update({
      where: { id: postId },
      data: dto,
    });
  }
}
