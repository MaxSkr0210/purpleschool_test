import { LoginDto } from '../../dto/login.dto';

export class LoginCommand {
  constructor(public dto: LoginDto) {}
}
