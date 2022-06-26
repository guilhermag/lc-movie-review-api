import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDto } from './dto';
import { JwtGuard } from '../auth/guard';
@UseGuards(JwtGuard)
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('id?')
  getById(@Query('id') id: string): string {
    return `Movie selected by id: ${id}`;
  }

  @Get('title?')
  getByTitle(@Query('title') title: string): string {
    return `Movie selected by title: ${title}`;
  }

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
