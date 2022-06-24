import { Controller, Get, Post, Body } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDto } from './dto';

@Controller('user')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('')
  getAllMovies() {
    return this.movieService.findAll();
  }

  @Get('')
  getAllCommentsByMovie() {
    return this.movieService.findAllComments();
  }

  @Get('')
  getAllReviewsByMovie() {
    return this.movieService.findAllReviews();
  }

  @Get('')
  getMovieById() {
    return this.movieService.findById();
  }

  @Post('create')
  create(@Body() dto: MovieDto) {
    return this.movieService.create(dto);
  }
}
