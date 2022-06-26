import { Controller, Get, UseGuards, Param, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { JwtGuard } from '../auth/guard';
@UseGuards(JwtGuard)
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('id-imdb?')
  getById(@Query('id') id: string): string {
    return `Movie selected by id: ${id}`;
  }

  @Get('title?')
  getByTitle(@Query('title') title: string): string {
    return `Movie selected by title: ${title}`;
  }

  @Get('')
  getAllMoviesInBase() {
    return this.movieService.findAll();
  }

  @Get(':id/comments')
  getAllCommentsByMovie(@Param() params: { id: string }) {
    return this.movieService.findAllComments(params.id);
  }

  @Get(':id/reviews')
  getAllReviewsByMovie(@Param() params: { id: string }) {
    return this.movieService.findAllReviews(params.id);
  }

  @Get(':id')
  getMovieById(@Param() params: { id: string }) {
    return this.movieService.findById(params.id);
  }
}
