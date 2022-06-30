import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { HttpService } from '@nestjs/axios';

import { CreateMovieDto, MovieResponseAPI } from './dto';
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
  async findMovieApiById(movieImdbId: string) {
    const movie = await this.findInApiByMovieIdIMDB(movieImdbId);
    return await this.convertToDto(movie);
  }

  async findMovieApiByTitle(movieTitle: string) {
    const movie = await this.findInApiByMovieTitle(movieTitle);
    return await this.convertToDto(movie);
  }

  async findAll() {
    return await this.prisma.movie.findMany();
  }

  async findAllComments(movieId: number) {
    await this.checkIfMovieExist(movieId);
    return await this.prisma.comment.findMany({
      where: {
        movieId: movieId,
      },
    });
  }

  async findAllReviews(movieId: number) {
    await this.checkIfMovieExist(movieId);
    return await this.prisma.review.findMany({
      where: {
        movieId: movieId,
      },
    });
  }

  async findById(movieId: number) {
    return await this.checkIfMovieExist(movieId);
  }

  // Methods related with other modules

  async findInApiByMovieIdIMDB(movieIdApi: string): Promise<MovieResponseAPI> {
    const apiKey = this.config.get('API_KEY_OMDB');
    const movie = await this.httpService.axiosRef
      .get(`http://www.omdbapi.com/?i=${movieIdApi}&apikey=${apiKey}`)
      .then((res) => res.data);
    if (movie.Response === 'False')
      throw new ForbiddenException('Id not found');
    return movie;
  }

  async findInApiByMovieTitle(movieTitle: string): Promise<MovieResponseAPI> {
    const apiKey = this.config.get('API_KEY_OMDB');
    const movie = await this.httpService.axiosRef
      .get(`http://www.omdbapi.com/?t=${movieTitle}&apikey=${apiKey}`)
      .then((res) => res.data);
    if (movie.Response === 'False')
      throw new ForbiddenException('Title not found');
    return movie;
  }

  async getMovieIdForCommentOrReviewByIdIMDB(
    movieIdApi: string,
  ): Promise<number> {
    let movie = await this.findByIdIMDB(movieIdApi);
    if (!movie) {
      const movieResponseAPI: MovieResponseAPI =
        await this.findInApiByMovieIdIMDB(movieIdApi);
      movie = await this.prisma.movie.create({
        data: {
          idIMDB: movieResponseAPI.imdbID,
          title: movieResponseAPI.Title,
          year: parseInt(movieResponseAPI.Year),
          genre: movieResponseAPI.Genre,
          director: movieResponseAPI.Director,
          plot: movieResponseAPI.Plot,
          language: movieResponseAPI.Language,
          type: movieResponseAPI.Type,
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
      const movieResponseAPI: MovieResponseAPI =
        await this.findInApiByMovieIdIMDB(movieIdIMDB);
      movie = await this.prisma.movie.create({
        data: {
          idIMDB: movieResponseAPI.imdbID,
          title: movieResponseAPI.Title,
          year: parseInt(movieResponseAPI.Year),
          genre: movieResponseAPI.Genre,
          director: movieResponseAPI.Director,
          plot: movieResponseAPI.Plot,
          language: movieResponseAPI.Language,
          type: movieResponseAPI.Type,
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

  private async checkIfMovieExist(movieId: number) {
    const movie = await this.prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!movie) {
      throw new BadRequestException('Movie not found');
    }
    return movie;
  }

  private async convertToDto(
    movieResponse: MovieResponseAPI,
  ): Promise<CreateMovieDto> {
    const movieImdbId = movieResponse.imdbID;
    const movieIdInDatabase = await this.getMovieIdForCommentOrReviewByIdIMDB(
      movieImdbId,
    );
    const allComments = await this.getArrayOfComments(movieIdInDatabase);
    const allReviews = await this.getArrayOfReviews(movieIdInDatabase);

    const movieDto: CreateMovieDto = {
      idIMDB: movieResponse.imdbID,
      title: movieResponse.Title,
      year: parseInt(movieResponse.Year),
      genre: movieResponse.Genre,
      director: movieResponse.Director,
      plot: movieResponse.Plot,
      language: movieResponse.Language,
      type: movieResponse.Type,
      comments: allComments,
      reviews: allReviews,
    };
    return movieDto;
  }

  private async getArrayOfComments(movieId: number): Promise<string[]> {
    const comments = await this.findAllComments(movieId);
    return [...comments.map((comment) => comment.description)];
  }

  private async getArrayOfReviews(movieId: number): Promise<number[]> {
    const reviews = await this.findAllReviews(movieId);
    return [...reviews.map((review) => review.movieScore)];
  }
}
