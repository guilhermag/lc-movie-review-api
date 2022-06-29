import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { HttpService } from '@nestjs/axios';

import { MovieResponse } from './dto';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MovieService {
  constructor(
    private readonly httpService: HttpService,
    private config: ConfigService,
    private prisma: PrismaService,
  ) {}

  // Methods related to the movie controller

  async findAll() {
    return await this.prisma.movie.findMany();
  }

  async findAllComments(movieId: number) {
    return await this.prisma.comment.findMany({
      where: {
        movieId: movieId,
      },
    });
  }

  async findAllReviews(movieId: number) {
    return await this.prisma.review.findMany({
      where: {
        movieId: movieId,
      },
    });
  }

  async findById(movieId: number) {
    return await this.prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });
  }

  // Methods related with other modules

  async findInApiByMovieIdIMDB(movieIdApi: string): Promise<MovieResponse> {
    try {
      const apiKey = this.config.get('API_KEY_OMDB');
      return await this.httpService.axiosRef
        .get(`http://www.omdbapi.com/?i=${movieIdApi}&apikey=${apiKey}`)
        .then((res) => res.data);
    } catch (error) {
      throw new ForbiddenException('Id not found');
    }
  }

  async findInApiByMovieTitle(movieTitle: string): Promise<MovieResponse> {
    try {
      const apiKey = this.config.get('API_KEY_OMDB');
      return await this.httpService.axiosRef
        .get(`http://www.omdbapi.com/?t=${movieTitle}&apikey=${apiKey}`)
        .then((res) => res.data);
    } catch (error) {
      throw new ForbiddenException('Title not found');
    }
  }

  async getMovieIdForCommentOrReviewByIdIMDB(
    movieIdApi: string,
  ): Promise<number> {
    let movie = await this.findByIdIMDB(movieIdApi);
    if (!movie) {
      const movieResponse: MovieResponse = await this.findInApiByMovieIdIMDB(
        movieIdApi,
      );
      movie = await this.prisma.movie.create({
        data: {
          idIMDB: movieResponse.imdbID,
          name: movieResponse.Title,
        },
      });
      return movie.id;
    }
    return movie.id;
  }

  async getMovieIdForCommentOrReviewByTitle(
    movieTitleApi: string,
  ): Promise<number> {
    const movieIdIMDB: string = (
      await this.findInApiByMovieTitle(movieTitleApi)
    ).imdbID;
    let movie = await this.findByIdIMDB(movieIdIMDB);
    if (!movie) {
      const movieResponse: MovieResponse = await this.findInApiByMovieIdIMDB(
        movieIdIMDB,
      );
      movie = await this.prisma.movie.create({
        data: {
          idIMDB: movieResponse.imdbID,
          name: movieResponse.Title,
        },
      });
      return movie.id;
    }
    return movie.id;
  }

  // Methods that only are used in the movie service

  private async findByIdIMDB(movieIdIMDB: string) {
    return await this.prisma.movie.findUnique({
      where: {
        idIMDB: movieIdIMDB,
      },
    });
  }

  private async checkIfUserExist(userId: number) {
    const user = await this.findById(userId);
    if (!user) {
      throw new BadRequestException('User does not exists');
    }
  }
}
