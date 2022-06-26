import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewDto } from './dto';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('')
  getAllReviews() {
    return this.reviewService.findAll();
  }

  @Get('user/:id')
  getAllCommentsByUser(@Param() params: { id: string }) {
    return this.reviewService.findByUser(params.id);
  }

  @Get(':id')
  getCommentById(@Param() params: { id: string }) {
    return this.reviewService.findById(params.id);
  }

  @Post('')
  create(@Body() dto: ReviewDto) {
    return this.reviewService.create(dto);
  }
}
