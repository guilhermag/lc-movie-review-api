import { Controller, Get, Post, Body } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('')
  getAllReviews() {
    return this.commentService.findAll();
  }

  @Get('')
  getAllReviewsByUser() {
    return this.commentService.findByUser();
  }

  @Get('')
  getReviewById() {
    return this.commentService.findById();
  }

  @Post('')
  create(@Body() dto: CommentDto) {
    return this.commentService.create(dto);
  }
}
