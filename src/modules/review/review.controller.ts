import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
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

  @Get('')
  getAllReviewsByUser() {
    return this.reviewService.findByUser();
  }

  @Get('')
  getReviewById() {
    return this.reviewService.findById();
  }

  @Post('')
  create(@Body() dto: ReviewDto) {
    return this.reviewService.create(dto);
  }
}
