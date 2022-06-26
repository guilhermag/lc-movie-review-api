import { Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

import { MovieDto } from './dto';

@Injectable()
export class MovieService {
  constructor(private readonly httpService: HttpService) {}

  findAll() {
    return 'This action get all the movies';
  }

  findAllComments(movieId: string) {
    return `This action get all the comments of the movie with id ${movieId}`;
  }

  findAllReviews(movieId: string) {
    return `This action get all the reviews of the movie with id ${movieId}`;
  }

  findById(movieId: string) {
    return `This action get all the informations of the movie with id ${movieId}`;
  }

  // create(dto: MovieDto) {
  //   return 'This action creates a new movie from a review';
  // }
}
