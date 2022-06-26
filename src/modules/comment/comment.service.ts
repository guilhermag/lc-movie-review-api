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

  findByUser(userId: string) {
    return `This action get all the comments of the user with id ${userId}`;
  }

  findById(commentId: string) {
    return `This action get all the informations of the comment with id ${commentId}`;
  }

  create(dto: CommentDto) {
    return 'This action adds a new comment';
  }
}
