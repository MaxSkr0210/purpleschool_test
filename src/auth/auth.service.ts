import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterCommand } from './commands/register/register.command';
import { LoginCommand } from './commands/login/login.command';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly commandBus: CommandBus) {}

  async register(dto: RegisterDto) {
    return this.commandBus.execute(new RegisterCommand(dto));
  }

  async login(dto: LoginDto) {
    return this.commandBus.execute(new LoginCommand(dto));
  }
}
