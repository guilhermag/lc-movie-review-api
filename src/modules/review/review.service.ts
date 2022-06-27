import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MovieService } from '../movie/movie.service';
import { UserService } from '../user/user.service';

import { ReviewDto } from './dto';

@Injectable()
export class ReviewService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly movieService: MovieService,
    private readonly userService: UserService,
  ) {}

  async createByIdIMDB(idIMDB: string, userId: number, dto: ReviewDto) {
    const movieId =
      await this.movieService.getMovieIdForCommentOrReviewByIdIMDB(idIMDB);
    const review = await this.prisma.review.create({
      data: {
        authorId: userId,
        movieScore: dto.movieScore,
        movieId: movieId,
      },
    });
    const reviewAuthorId = review.authorId;

    await this.userService.updateUserScore(reviewAuthorId);
    await this.userService.updateUserRole(reviewAuthorId);

    return review;
  }

  async createByTitle(movieTitle: string, userId: number, dto: ReviewDto) {
    const movieId = await this.movieService.getMovieIdForCommentOrReviewByTitle(
      movieTitle,
    );
    const review = await this.prisma.review.create({
      data: {
        authorId: userId,
        movieScore: dto.movieScore,
        movieId: movieId,
      },
    });
    const reviewAuthorId = review.authorId;

    await this.userService.updateUserScore(reviewAuthorId);
    await this.userService.updateUserRole(reviewAuthorId);

    return review;
  }

  async findAll() {
    return await this.prisma.review.findMany();
  }

  async findByUser(userId: number) {
    return await this.prisma.review.findMany({
      where: {
        authorId: userId,
      },
    });
  }

  async findById(userId: number, reviewId: number) {
    return await this.prisma.review.findMany({
      where: {
        authorId: userId,
        id: reviewId,
      },
    });
  }
}
