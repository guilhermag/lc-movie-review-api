import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('')
  getAllComments() {
    return this.commentService.findAll();
  }

  @Get('user/:id')
  getAllCommentsByUser(@Param() params: { id: string }) {
    return this.commentService.findByUser(params.id);
  }

  @Get(':id')
  getCommentById(@Param() params: { id: string }) {
    return this.commentService.findById(params.id);
  }

  @Post('')
  create(@Body() dto: CommentDto) {
    return this.commentService.create(dto);
  }
}
