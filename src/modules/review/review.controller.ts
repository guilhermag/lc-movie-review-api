import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  ParseIntPipe,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewDto } from './dto';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiBearerAuth('JWT-auth')
@Controller('review')
@ApiTags('Review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('movie/id-imdb?')
  @ApiOperation({ summary: 'Creates a review using the movie imdb id' })
  createReviewByMovieId(
    @GetUser('id') userId: number,
    @Query('id') idIMDB: string,
    @Body() dto: ReviewDto,
  ) {
    return this.reviewService.createByIdIMDB(idIMDB, userId, dto);
  }

  @Post('movie/title?')
  @ApiOperation({ summary: 'Creates a review using the movie title' })
  createReviewByMovieTitle(
    @GetUser('id') userId: number,
    @Query('title') title: string,
    @Body() dto: ReviewDto,
  ) {
    return this.reviewService.createByTitle(title, userId, dto);
  }

  @Get('')
  @ApiOperation({ summary: 'Get all the reviews' })
  getAllReviews() {
    return this.reviewService.findAll();
  }

  @Get('logged-user')
  @ApiOperation({ summary: 'Get all the reviews from the logged user' })
  getAllReviewsOfLoggedUser(@GetUser('id') userId: number) {
    return this.reviewService.findByUser(userId);
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'Get all the reviews from an user in expecific' })
  getAllReviewsByUser(@Param('id', ParseIntPipe) userId: number) {
    return this.reviewService.findByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a review in expecific' })
  getReviewById(@Param('id', ParseIntPipe) reviewId: number) {
    return this.reviewService.findById(reviewId);
  }

  @Patch('edit/:id')
  @ApiOperation({
    summary:
      'Logged user can edit own review or from others if the user is a moderator',
  })
  editReviewById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) reviewId: number,
    @Body() newScore: number,
  ) {
    return this.reviewService.editReviewById(userId, reviewId, newScore);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a review' })
  deleteCommentById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) reviewId: number,
  ) {
    return this.reviewService.deleteById(userId, reviewId);
  }
}
