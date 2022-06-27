import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewDto } from './dto';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

@UseGuards(JwtGuard)
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('')
  getAllReviews() {
    return this.reviewService.findAll();
  }

  @Get('user')
  getAllReviewsByUser(@GetUser('id') userId: number) {
    return this.reviewService.findByUser(userId);
  }

  @Get(':id')
  getReviewById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) reviewId: number,
  ) {
    return this.reviewService.findById(userId, reviewId);
  }

  // @Post('')
  // create(@GetUser('id') userId: number, @Body() dto: ReviewDto) {
  //   return this.reviewService.create(userId, dto);
  // }
}
