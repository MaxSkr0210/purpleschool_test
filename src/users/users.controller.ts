import { Controller, Get, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.decorator';
import { ZodValidationPipe } from 'nestjs-zod';

@UsePipes(ZodValidationPipe)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyProfile(@User('id') userId: number) {
    return this.userService.getMyProfile(userId);
  }
}
