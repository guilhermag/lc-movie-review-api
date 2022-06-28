import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
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

  // Methods related to the comment controller.

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
    this.userService.checkIfUserExist(userId);
    return await this.prisma.comment.findMany({
      where: {
        authorId: userId,
      },
    });
  }

  async findById(commentId: number) {
    this.checkIfCommentExist(commentId);
    return await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
  }

  async answerComment(
    userId: number,
    commentId: number,
    dto: CommentAnswerDto,
  ) {
    await this.checkIfCommentExist(commentId);
    await this.checkRoleForComments(userId);

    const answerModel = await this.createCommentAnswerModel(
      userId,
      dto.answerComment,
    );

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

  async likeCommentById(commentId: number, userEvaluatorId: number) {
    await this.checkIfCommentExist(commentId);
    await this.checkRoleForLike(userEvaluatorId);
    return await this.likeComment(commentId);
  }

  async dislikeCommentById(commentId: number, userEvaluatorId: number) {
    await this.checkIfCommentExist(commentId);
    await this.checkRoleForLike(userEvaluatorId);
    return await this.dislikeComment(commentId);
  }

  async quoteComment(userId: number, commentId: number) {
    await this.checkIfCommentExist(commentId);
    await this.checkRoleForQuote(userId);

    const allQuotes: number[] = await this.userService.getAllQuotesById(userId);
    const quotesUpdated: number[] = [...allQuotes, commentId];

    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        quotedCommentsId: quotesUpdated,
      },
    });
  }

  async deleteById(userId: number, commentId: number) {
    await this.checkIfCommentExist(commentId);
    await this.checkRoleForMod(userId);
    await this.prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    return { message: `The comment with id ${commentId} was deleted` };
  }

  async commentRepeated(userId: number, commentId: number) {
    await this.checkIfCommentExist(commentId);
    await this.checkRoleForMod(userId);
    return await this.markCommentRepeated(commentId);
  }

  async commentNotRepeated(userId: number, commentId: number) {
    await this.checkIfCommentExist(commentId);
    await this.checkRoleForMod(userId);
    return await this.unmarkCommentRepeated(commentId);
  }

  // Methods that only are used in the comment service

  private async createCommentAnswerModel(
    userId: number,
    answer: string,
  ): Promise<string> {
    const userEmail = (await this.userService.findById(userId)).email;
    return `Message: ${answer}, by: ${userEmail}`;
  }

  private async getAllAnswersById(commentId: number): Promise<string[]> {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comment) throw new BadRequestException('Comment not found');
    return comment.answers;
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

  private async markCommentRepeated(commentId: number) {
    return await this.prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        repeated: true,
      },
    });
  }

  private async unmarkCommentRepeated(commentId: number) {
    return await this.prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        repeated: false,
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
    if (userRole === 'READER' || userRole === 'BASIC') {
      throw new ForbiddenException(
        'Only Advanced and Moderators users can quote a comment!',
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
      throw new ForbiddenException(
        'Only moderators can delete a comment or mark it as repeated!',
      );
    }
  }

  private async checkIfCommentExist(commentId: number) {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comment) throw new BadRequestException('Comment not found');
  }
}
