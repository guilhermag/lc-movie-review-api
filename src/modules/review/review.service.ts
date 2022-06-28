import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
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

  // Methods related to the comment controller.

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
    this.checkScore(dto.movieScore);
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
    await this.userService.checkIfUserExist(userId);
    return await this.prisma.review.findMany({
      where: {
        authorId: userId,
      },
    });
  }

  async findById(reviewId: number) {
    await this.checkIfReviewExist(reviewId);
    return await this.prisma.review.findUnique({
      where: {
        id: reviewId,
      },
    });
  }

  // Methods that only are used in the comment service

  private checkScore(reviewScore: number) {
    if (reviewScore < 0 || reviewScore > 10) {
      throw new ForbiddenException(
        'Reviews scores can only be between 0 and 10',
      );
    }
  }

  private async checkIfReviewExist(reviewId: number) {
    const review = await this.prisma.review.findUnique({
      where: {
        id: reviewId,
      },
    });
    if (!review) throw new BadRequestException('Review not found');
  }
}
