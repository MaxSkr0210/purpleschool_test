export class DeletePostCommand {
  constructor(
    public postId: number,
    public userId: number,
  ) {}
}
