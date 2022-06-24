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

  findAllComments() {
    return 'This action get all the movies';
  }

  findAllReviews() {
    return 'This action get all the movies';
  }

  findById() {
    return 'This action get a review by its id';
  }

  create(dto: MovieDto) {
    return 'This action creates a new movie from a review';
  }
}
