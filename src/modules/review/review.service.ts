import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentService } from '../comment/comment.service';
import { Role } from '../comment/dto';
import { MovieService } from '../movie/movie.service';
import { UserService } from '../user/user.service';

import { ReviewDto } from './dto';

@Injectable()
export class ReviewService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly movieService: MovieService,
    private readonly userService: UserService,
    private readonly commentService: CommentService,
  ) {}

  // Methods related to the comment controller.

  async createByIdIMDB(idIMDB: string, userId: number, dto: ReviewDto) {
    this.checkScore(dto.movieScore);
    const movieId =
      await this.movieService.getMovieIdForCommentOrReviewByIdIMDB(idIMDB);
    const review = await this.prisma.review.create({
      data: {
        authorId: userId,
        movieScore: dto.movieScore,
        movieId: movieId,
      },
    });

    await this.userService.updateUserScore(userId);
    await this.userService.updateUserRole(userId);

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

    await this.userService.updateUserScore(userId);
    await this.userService.updateUserRole(userId);

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

  async editReviewById(userId: number, reviewId: number, newScore: number) {
    await this.checkIfReviewExist(reviewId);
    const authorId = (await this.findById(reviewId)).authorId;
    const loggedUserRole: Role = await this.userService.getUserRole(userId);

    if (authorId === userId || loggedUserRole === 'MODERATOR') {
      return await this.prisma.review.update({
        where: {
          id: reviewId,
        },
        data: {
          movieScore: newScore,
        },
      });
    }

    throw new ForbiddenException('Only moderators or authors can edit reviews');
  }

  async deleteById(userId: number, reviewId: number) {
    await this.checkIfReviewExist(reviewId);
    await this.commentService.checkRoleForMod(userId);
    await this.prisma.review.delete({
      where: {
        id: reviewId,
      },
    });
    return { message: `The review with id ${reviewId} was deleted` };
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
