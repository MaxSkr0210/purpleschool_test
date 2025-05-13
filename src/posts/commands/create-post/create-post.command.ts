import { CreatePostDto } from '../../dto/create-post.dto';

export class CreatePostCommand {
  constructor(
    public dto: CreatePostDto,
    public userId: number,
  ) {}
}
