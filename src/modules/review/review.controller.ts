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
    description: 'sucess',
  })
  @ApiResponse({
    status: 404,
    description: 'fail',
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
    description: 'sucess',
  })
  @ApiResponse({
    status: 404,
    description: 'fail',
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
    status: 201,
    description: 'sucess',
  })
  @ApiResponse({
    status: 404,
    description: 'fail',
  })
  getAllReviews() {
    return this.reviewService.findAll();
  }

  @Get('logged-user')
  @ApiOperation({ summary: 'Get all the reviews from the logged user' })
  @ApiResponse({
    status: 201,
    description: 'sucess',
  })
  @ApiResponse({
    status: 404,
    description: 'fail',
  })
  getAllReviewsOfLoggedUser(@GetUser('id') userId: number) {
    return this.reviewService.findByUser(userId);
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'Get all the reviews from an user in expecific' })
  @ApiResponse({
    status: 201,
    description: 'sucess',
  })
  @ApiResponse({
    status: 404,
    description: 'fail',
  })
  getAllReviewsByUser(@Param('id', ParseIntPipe) userId: number) {
    return this.reviewService.findByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a review in expecific' })
  @ApiResponse({
    status: 201,
    description: 'sucess',
  })
  @ApiResponse({
    status: 404,
    description: 'fail',
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
    status: 201,
    description: 'sucess',
  })
  @ApiResponse({
    status: 404,
    description: 'fail',
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
    status: 201,
    description: 'sucess',
  })
  @ApiResponse({
    status: 404,
    description: 'fail',
  })
  deleteCommentById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) reviewId: number,
  ) {
    return this.reviewService.deleteById(userId, reviewId);
  }
}
