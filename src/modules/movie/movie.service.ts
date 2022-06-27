import { ForbiddenException, Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';

import { MovieDto, MovieResponse } from './dto';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MovieService {
  constructor(
    private readonly httpService: HttpService,
    private config: ConfigService,
    private prisma: PrismaService,
  ) {}

  async saveMovie(dto: MovieDto): Promise<number> {
    const movie = await this.prisma.movie.create({
      data: {
        idIMDB: dto.idIMDB,
        name: dto.name,
      },
    });
    return movie.id;
  }

  async findInApiByMovieIdIMDB(movieIdApi: string): Promise<MovieResponse> {
    try {
      const apiKey = this.config.get('API_KEY_OMDB');
      return await this.httpService.axiosRef
        .get(`http://www.omdbapi.com/?i=${movieIdApi}&apikey=${apiKey}`)
        .then((res) => res.data);
    } catch (error) {
      console.log(error);
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
      console.log(error);
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

  async findAll() {
    return await this.prisma.movie.findMany();
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

  async findByIdIMDB(movieIdIMDB: string) {
    return await this.prisma.movie.findUnique({
      where: {
        idIMDB: movieIdIMDB,
      },
    });
  }
}
