import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { MovieService } from './movie.service';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('')
  getAllMoviesInBase() {
    return this.movieService.findAll();
  }

  @Get('comments')
  getAllCommentsByMovie(@Param() params: { id: string }) {
    return this.movieService.findAllComments(params.id);
  }

  @Get('reviews')
  getAllReviewsByMovie(@Param() params: { id: string }) {
    return this.movieService.findAllReviews(params.id);
  }

  @Get(':id')
  getMovieById(@Param() params: { id: string }) {
    return this.movieService.findById(params.id);
  }
}
