import { Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

import { CommentDto } from './dto';

@Injectable()
export class CommentService {
  constructor(private readonly httpService: HttpService) {}

  findAll() {
    return 'This action get all the comments';
  }

  findByUser() {
    return 'This action get all the comments from a user';
  }

  findById() {
    return 'This action get a comment by its id';
  }

  create(dto: CommentDto) {
    return 'This action adds a new comment';
  }
}
