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
