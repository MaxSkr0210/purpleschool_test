import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from '../prisma/prisma.service';
import { GetMyProfileHandler } from './queries/get-my-profile/get-my-profile.handler';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [CqrsModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, GetMyProfileHandler],
})
export class UsersModule {}
