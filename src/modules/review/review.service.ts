import { Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

import { ReviewDto } from './dto';

@Injectable()
export class ReviewService {
  constructor(private readonly httpService: HttpService) {}

  findAll() {
    return 'This action get all the reviews';
  }

  findByUser() {
    return 'This action get all the reviews from a user';
  }

  findById() {
    return 'This action get a review by its id';
  }

  create(dto: ReviewDto) {
    return 'This action adds a new review';
  }
}
