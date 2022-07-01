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
import { CreateReviewDto, EditReviewDto } from './dto';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ReviewSwagger } from '../movie/swagger/review.swagger';

@UseGuards(JwtGuard)
@ApiBearerAuth('JWT-auth')
@Controller('review')
@ApiTags('Reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('movie/id-imdb?')
  @ApiOperation({ summary: 'Creates a review using the movie imdb id' })
  @ApiResponse({
    status: 201,
    description: 'Review created',
    type: ReviewSwagger,
  })
  @ApiResponse({
    status: 403,
    description: 'Movie id not found',
  })
  createReviewByMovieId(
    @GetUser('id') userId: number,
    @Query('id') idIMDB: string,
    @Body() dto: CreateReviewDto,
  ) {
    return this.reviewService.createByIdIMDB(idIMDB, userId, dto);
  }

  @Post('movie/title?')
  @ApiOperation({ summary: 'Creates a review using the movie title' })
  @ApiResponse({
    status: 201,
    description: 'Review created',
    type: ReviewSwagger,
  })
  @ApiResponse({
    status: 403,
    description: 'Movie title not found',
  })
  createReviewByMovieTitle(
    @GetUser('id') userId: number,
    @Query('title') title: string,
    @Body() dto: CreateReviewDto,
  ) {
    return this.reviewService.createByTitle(title, userId, dto);
  }

  @Get('')
  @ApiOperation({ summary: 'Get all the reviews' })
  @ApiResponse({
    status: 200,
    description: 'All the reviews',
    type: ReviewSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'Database error',
  })
  getAllReviews() {
    return this.reviewService.findAll();
  }

  @Get('logged-user')
  @ApiOperation({ summary: 'Get all the reviews from the logged user' })
  @ApiResponse({
    status: 200,
    description: 'All the reviews from the logged user or a empty array',
    type: ReviewSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'Database error',
  })
  getAllReviewsOfLoggedUser(@GetUser('id') userId: number) {
    return this.reviewService.findByUser(userId);
  }

  @Get('user/:id')
  @ApiOperation({
    summary: 'Get all the reviews from an user in expecific or a empty array',
  })
  @ApiResponse({
    status: 200,
    description: 'All the reviews of a user in expecific',
    type: ReviewSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 403,
    description: 'User not found',
  })
  getAllReviewsByUser(@Param('id', ParseIntPipe) userId: number) {
    return this.reviewService.findByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a review in expecific' })
  @ApiResponse({
    status: 200,
    description: 'The selected review',
    type: ReviewSwagger,
  })
  @ApiResponse({
    status: 403,
    description: 'Review not found',
  })
  getReviewById(@Param('id', ParseIntPipe) reviewId: number) {
    return this.reviewService.findById(reviewId);
  }

  @Patch('edit/:id')
  @ApiOperation({
    summary:
      'Logged user can edit own review or from others if the user is a moderator',
  })
  @ApiResponse({
    status: 200,
    description: 'The edited review',
    type: ReviewSwagger,
  })
  @ApiResponse({
    status: 403,
    description: 'Review not found',
  })
  editReviewById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) reviewId: number,
    @Body() dto: EditReviewDto,
  ) {
    return this.reviewService.editReviewById(userId, reviewId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a review' })
  @ApiResponse({
    status: 200,
    description: 'Review deleted',
  })
  @ApiResponse({
    status: 403,
    description:
      'Review not found, or a user it is not the author or it is not a moderator',
  })
  deleteCommentById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) reviewId: number,
  ) {
    return this.reviewService.deleteById(userId, reviewId);
  }
}
