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

  findByUser(userId: string) {
    return `This action get all the reviews of the user with id ${userId}`;
  }

  findById(reviewId: string) {
    return `This action get all the informations of the review with id ${reviewId}`;
  }

  create(dto: ReviewDto) {
    return 'This action adds a new review';
  }
}
