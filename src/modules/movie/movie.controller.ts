import {
  Controller,
  Get,
  UseGuards,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { JwtGuard } from '../auth/guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMovieDto } from './dto';
import { CommentSwagger } from './swagger/comments.swagger';
import { ReviewSwagger } from './swagger/review.swagger';

@UseGuards(JwtGuard)
@ApiBearerAuth('JWT-auth')
@Controller('movies')
@ApiTags('Movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('search/id/:id')
  @ApiOperation({ summary: 'Search for a movie in OMDb API by the imdb id' })
  @ApiResponse({
    status: 200,
    description: 'Movie found',
    type: CreateMovieDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Movie not found',
  })
  getMovieApiById(@Param('id') movieImdbId: string) {
    return this.movieService.findMovieApiById(movieImdbId);
  }

  @Get('search/title/:title')
  @ApiOperation({ summary: 'Search for a movie in OMDb API by the title' })
  @ApiResponse({
    status: 200,
    description: 'Movie found',
    type: CreateMovieDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Movie not found',
  })
  getMovieApiByTitle(@Param('title') movieTitle: string) {
    return this.movieService.findMovieApiByTitle(movieTitle);
  }

  @Get('')
  @ApiOperation({ summary: 'Get all the movies with comments or reviews' })
  @ApiResponse({
    status: 200,
    description: 'sucess',
    type: CreateMovieDto,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'database error',
  })
  getAllMoviesInBase() {
    return this.movieService.findAll();
  }

  @Get('comments/:id')
  @ApiOperation({ summary: 'Get all the comments of a movie' })
  @ApiResponse({
    status: 200,
    description: 'All the comments',
    type: CommentSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 403,
    description: 'Movie not found',
  })
  getAllCommentsByMovie(@Param('id', ParseIntPipe) movieId: number) {
    return this.movieService.findAllComments(movieId);
  }

  @Get('reviews/:id')
  @ApiOperation({ summary: 'Get all the reviews of a movie' })
  @ApiResponse({
    status: 200,
    description: 'All the reviews',
    type: ReviewSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 403,
    description: 'Movie not found',
  })
  getAllReviewsByMovie(@Param('id', ParseIntPipe) movieId: number) {
    return this.movieService.findAllReviews(movieId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a movie in expecific' })
  @ApiResponse({
    status: 200,
    description: 'Movie found',
    type: CreateMovieDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Movie not found',
  })
  getMovieById(@Param('id', ParseIntPipe) movieId: number) {
    return this.movieService.findById(movieId);
  }
}
