import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewDto } from './dto';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

@UseGuards(JwtGuard)
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('movie/id-imdb?')
  createReviewByMovieId(
    @Query('id') idIMDB: string,
    @GetUser('id') userId: number,
    @Body() dto: ReviewDto,
  ) {
    return this.reviewService.createByIdIMDB(idIMDB, userId, dto);
  }

  @Post('movie/title?')
  createReviewByMovieTitle(
    @Query('title') title: string,
    @GetUser('id') userId: number,
    @Body() dto: ReviewDto,
  ) {
    return this.reviewService.createByTitle(title, userId, dto);
  }

  @Get('')
  getAllReviews() {
    return this.reviewService.findAll();
  }

  @Get('logged-user')
  getAllReviewsOfLoggedUser(@GetUser('id') userId: number) {
    return this.reviewService.findByUser(userId);
  }

  @Get('user/:id')
  getAllReviewsByUser(@Param('id', ParseIntPipe) userId: number) {
    return this.reviewService.findByUser(userId);
  }

  @Get(':id')
  getReviewById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) reviewId: number,
  ) {
    return this.reviewService.findById(userId, reviewId);
  }
}
