import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.decorator';
import { ZodValidationPipe } from 'nestjs-zod';

@UsePipes(ZodValidationPipe)
@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Body() dto: CreatePostDto, @User('id') userId: number) {
    return this.postService.createPost(dto, userId);
  }

  @Get(':id')
  async getPostById(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getPostById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePostDto,
    @User('id') userId: number,
  ) {
    return this.postService.updatePost(id, dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number,
  ) {
    return this.postService.deletePost(id, userId);
  }
}
