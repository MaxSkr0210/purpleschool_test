import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetMyProfileQuery } from './queries/get-my-profile/get-my-profile.query';

@Injectable()
export class UsersService {
  constructor(private readonly queryBus: QueryBus) {}

  async getMyProfile(userId: number) {
    return this.queryBus.execute(new GetMyProfileQuery(userId));
  }
}
