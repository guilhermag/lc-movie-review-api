import { ForbiddenException, Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';

import { MovieDto } from './dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MovieService {
  constructor(
    private readonly httpService: HttpService,
    private config: ConfigService,
  ) {}

  async findByMovieIdIMDB(movieIdApi: string) {
    try {
      const apiKey = this.config.get('API_KEY_OMDB');
      return await this.httpService.axiosRef
        .get(`http://www.omdbapi.com/?i=${movieIdApi}&apikey=${apiKey}`)
        .then((res) => res.data);
    } catch (error) {
      throw new ForbiddenException('Id not found');
    }
  }

  async findByMovieTitle(movieTitleApi: string) {
    try {
      const apiKey = this.config.get('API_KEY_OMDB');
      return await this.httpService.axiosRef
        .get(`http://www.omdbapi.com/?t=${movieTitleApi}&apikey=${apiKey}`)
        .then((res) => res.data);
    } catch (error) {
      throw new ForbiddenException('Title not found');
    }
  }

  findAll() {
    return 'This action get all the movies in db';
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
}
