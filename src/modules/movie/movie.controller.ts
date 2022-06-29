import {
  Controller,
  Get,
  UseGuards,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { JwtGuard } from '../auth/guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiBearerAuth('JWT-auth')
@Controller('movies')
@ApiTags('Movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('search/id/:id')
  @ApiOperation({ summary: 'Search for a movie in OMDb API by the imdb id' })
  getMovieApiById(@Param('id') movieImdbId: string) {
    return this.movieService.findMovieApiById(movieImdbId);
  }

  @Get('search/title/:title')
  @ApiOperation({ summary: 'Search for a movie in OMDb API by the title' })
  getMovieApiByTitle(@Param('title') movieTitle: string) {
    return this.movieService.findMovieApiByTitle(movieTitle);
  }

  @Get('')
  @ApiOperation({ summary: 'Get all the movies with comments or reviews' })
  getAllMoviesInBase() {
    return this.movieService.findAll();
  }

  @Get('comments/:id')
  @ApiOperation({ summary: 'Get all the comments of a movie' })
  getAllCommentsByMovie(@Param('id', ParseIntPipe) movieId: number) {
    return this.movieService.findAllComments(movieId);
  }

  @Get('reviews/:id')
  @ApiOperation({ summary: 'Get all the reviews of a movie' })
  getAllReviewsByMovie(@Param('id', ParseIntPipe) movieId: number) {
    return this.movieService.findAllReviews(movieId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a movie in expecific' })
  getMovieById(@Param('id', ParseIntPipe) movieId: number) {
    return this.movieService.findById(movieId);
  }
}
