import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../prisma/prisma.service';
import { GetMyProfileQuery } from './get-my-profile.query';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetMyProfileQuery)
export class GetMyProfileHandler implements IQueryHandler<GetMyProfileQuery> {
  constructor(private prisma: PrismaService) {}

  async execute(query: GetMyProfileQuery) {
    const { userId } = query;
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, posts: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
