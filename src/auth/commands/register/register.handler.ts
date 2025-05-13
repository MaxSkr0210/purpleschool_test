import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../prisma/prisma.service';
import { RegisterCommand } from './register.command';
import * as bcrypt from 'bcrypt';
import { ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as process from 'node:process';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async execute(command: RegisterCommand) {
    const { email, password, name } = command.dto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });

    return { accessToken: token };
  }
}
