import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MovieService } from '../movie/movie.service';
import { UserService } from '../user/user.service';

import { CommentDto, Role } from './dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly movieService: MovieService,
    private readonly userService: UserService,
  ) {}

  async createByIdIMDB(idIMDB: string, userId: number, dto: CommentDto) {
    const authorRole: Role = await this.userService.getUserRole(userId);
    if (authorRole === 'READER') {
      throw new ForbiddenException('Readers can not write comments!');
    }
    const movieId =
      await this.movieService.getMovieIdForCommentOrReviewByIdIMDB(idIMDB);
    const comment = await this.prisma.comment.create({
      data: {
        authorId: userId,
        description: dto.description,
        likes: 0,
        dislikes: 0,
        movieId: movieId,
      },
    });
    const commentAuthorId = comment.authorId;

    await this.userService.updateUserScore(commentAuthorId);
    await this.userService.updateUserRole(commentAuthorId);

    return comment;
  }

  async createByTitle(movieTitle: string, userId: number, dto: CommentDto) {
    const authorRole: Role = await this.userService.getUserRole(userId);
    if (authorRole === 'READER') {
      throw new ForbiddenException('Readers can not write comments!');
    }
    const movieId = await this.movieService.getMovieIdForCommentOrReviewByTitle(
      movieTitle,
    );
    const comment = await this.prisma.comment.create({
      data: {
        authorId: userId,
        description: dto.description,
        likes: 0,
        dislikes: 0,
        movieId: movieId,
      },
    });
    const commentAuthorId = comment.authorId;

    await this.userService.updateUserScore(commentAuthorId);
    await this.userService.updateUserRole(commentAuthorId);

    return comment;
  }

  async findAll() {
    return await this.prisma.comment.findMany();
  }

  async findByUser(userId: number) {
    return await this.prisma.comment.findMany({
      where: {
        authorId: userId,
      },
    });
  }

  async findById(userId: number, commentId: number) {
    return await this.prisma.comment.findMany({
      where: {
        authorId: userId,
        id: commentId,
      },
    });
  }
}
