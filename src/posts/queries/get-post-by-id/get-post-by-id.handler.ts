import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../prisma/prisma.service';
import { GetPostByIdQuery } from './get-post-by-id.query';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetPostByIdQuery)
export class GetPostByIdHandler implements IQueryHandler<GetPostByIdQuery> {
  constructor(private prisma: PrismaService) {}

  async execute(query: GetPostByIdQuery) {
    const { postId } = query;
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      include: { author: { select: { email: true, name: true } } },
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }
}
