import { UpdatePostDto } from '../../dto/update-post.dto';

export class UpdatePostCommand {
  constructor(
    public postId: number,
    public dto: UpdatePostDto,
    public userId: number,
  ) {}
}
