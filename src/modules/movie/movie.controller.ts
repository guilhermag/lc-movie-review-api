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
import {
  allComments,
  allMovies,
  allReviews,
  dbError,
  found,
  notFound,
} from './swagger/responses.swagger';

@UseGuards(JwtGuard)
@ApiBearerAuth('JWT-auth')
@Controller('movies')
@ApiTags('Movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('search/id/:id')
  @ApiOperation({ summary: 'Search for a movie in OMDb API by the imdb id' })
  @ApiResponse(found)
  @ApiResponse(notFound)
  getMovieApiById(@Param('id') movieImdbId: string) {
    return this.movieService.findMovieApiById(movieImdbId);
  }

  @Get('search/title/:title')
  @ApiOperation({ summary: 'Search for a movie in OMDb API by the title' })
  @ApiResponse(found)
  @ApiResponse(notFound)
  getMovieApiByTitle(@Param('title') movieTitle: string) {
    return this.movieService.findMovieApiByTitle(movieTitle);
  }

  @Get('')
  @ApiOperation({ summary: 'Get all the movies with comments or reviews' })
  @ApiResponse(allMovies)
  @ApiResponse(dbError)
  getAllMoviesInBase() {
    return this.movieService.findAll();
  }

  @Get('comments/:id')
  @ApiOperation({ summary: 'Get all the comments of a movie' })
  @ApiResponse(allComments)
  @ApiResponse(notFound)
  getAllCommentsByMovie(@Param('id', ParseIntPipe) movieId: number) {
    return this.movieService.findAllComments(movieId);
  }

  @Get('reviews/:id')
  @ApiOperation({ summary: 'Get all the reviews of a movie' })
  @ApiResponse(allReviews)
  @ApiResponse(notFound)
  getAllReviewsByMovie(@Param('id', ParseIntPipe) movieId: number) {
    return this.movieService.findAllReviews(movieId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a movie in expecific' })
  @ApiResponse(found)
  @ApiResponse(notFound)
  getMovieById(@Param('id', ParseIntPipe) movieId: number) {
    return this.movieService.findById(movieId);
  }
}
