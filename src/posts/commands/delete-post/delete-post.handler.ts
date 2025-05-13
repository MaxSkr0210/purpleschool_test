import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../prisma/prisma.service';
import { DeletePostCommand } from './delete-post.command';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

@CommandHandler(DeletePostCommand)
export class DeletePostHandler implements ICommandHandler<DeletePostCommand> {
  constructor(private prisma: PrismaService) {}

  async execute(command: DeletePostCommand) {
    const { postId, userId } = command;

    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (post.authorId !== userId) {
      throw new ForbiddenException('You can delete only your own posts');
    }

    await this.prisma.post.delete({ where: { id: postId } });
    return { success: true };
  }
}
