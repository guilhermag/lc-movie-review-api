import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MovieService } from '../movie/movie.service';
import { UserService } from '../user/user.service';

import { CommentDto, CommentAnswerDto, Role } from './dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly movieService: MovieService,
    private readonly userService: UserService,
  ) {}

  async createByIdIMDB(idIMDB: string, userId: number, dto: CommentDto) {
    await this.checkRoleForComments(userId);
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
    await this.checkRoleForComments(userId);
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

  async answerComment(
    userId: number,
    commentId: number,
    dto: CommentAnswerDto,
  ) {
    await this.checkRoleForComments(userId);
    const userEmail = (await this.userService.findById(userId)).email;
    const answerModel = `Message: ${dto.answerComment}, by: ${userEmail}`;
    const allAnswers: string[] = await this.getAllAnswersById(commentId);
    const atualComment = await this.prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        answers: [...allAnswers, answerModel],
      },
    });
    const commentAuthorId = userId;

    await this.userService.updateUserScore(commentAuthorId);
    await this.userService.updateUserRole(commentAuthorId);
    return atualComment;
  }

  async getAllAnswersById(commentId: number): Promise<string[]> {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    return comment.answers;
  }

  async likeCommentById(commentId: number, userEvaluatorId: number) {
    await this.checkRoleForLike(userEvaluatorId);
    return await this.likeComment(commentId);
  }

  async dislikeCommentById(commentId: number, userEvaluatorId: number) {
    await this.checkRoleForLike(userEvaluatorId);
    return await this.dislikeComment(commentId);
  }

  async quoteComment(userId: number, commentId: number) {
    this.checkRoleForQuote(userId);

    const allQuotes: number[] = await this.userService.getAllQuotesById(userId);

    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        quotedCommentsId: [...allQuotes, commentId],
      },
    });
  }

  async deleteById(userId: number, commentId: number) {
    await this.checkRoleForMod(userId);
    return await this.prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
  }

  private async likeComment(commentId: number) {
    return await this.prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        likes: {
          increment: 1,
        },
      },
    });
  }

  private async dislikeComment(commentId: number) {
    return await this.prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        dislikes: {
          increment: 1,
        },
      },
    });
  }

  private async checkRoleForComments(userId: number) {
    const authorRole: Role = await this.userService.getUserRole(userId);
    if (authorRole === 'READER') {
      throw new ForbiddenException('Readers can not write comments!');
    }
  }

  private async checkRoleForQuote(userId: number) {
    const userRole: Role = await this.userService.getUserRole(userId);
    if (userRole !== 'READER' && userRole !== 'BASIC') {
      throw new ForbiddenException(
        'Only Advanced and Moderatos users can cite a comment!',
      );
    }
  }

  private async checkRoleForLike(userId: number) {
    const authorRole: Role = await this.userService.getUserRole(userId);
    if (authorRole === 'READER' || authorRole === 'BASIC') {
      throw new ForbiddenException(
        'Readers and Basic users can not like or dislike comments!',
      );
    }
  }

  private async checkRoleForMod(userId: number) {
    const authorRole: Role = await this.userService.getUserRole(userId);
    if (authorRole !== 'MODERATOR') {
      throw new ForbiddenException('Only moderators can delete a comment!');
    }
  }
}
