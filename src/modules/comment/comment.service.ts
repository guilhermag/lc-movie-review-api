import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MovieService } from '../movie/movie.service';
import { UserService } from '../user/user.service';

import {
  CreateCommentDto,
  ReplyCommentDto,
  QuoteCommentDto,
  IComment,
  Role,
  EditCommentDto,
} from './dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly movieService: MovieService,
    private readonly userService: UserService,
  ) {}

  // Methods related to the comment controller.

  async createByIdIMDB(
    idIMDB: string,
    userId: number,
    dto: CreateCommentDto,
  ): Promise<IComment> {
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

    await this.userService.updateUserScore(userId);
    await this.userService.updateUserRole(userId);

    return comment;
  }

  async createByTitle(
    movieTitle: string,
    userId: number,
    dto: CreateCommentDto,
  ): Promise<IComment> {
    await this.checkRoleForComments(userId);
    const movieId = await this.movieService.getMovieIdForCommentOrReviewByTitle(
      movieTitle,
    );
    const comment = await this.create(dto, userId, movieId);

    await this.userService.updateUserScore(userId);
    await this.userService.updateUserRole(userId);

    return comment;
  }

  async findAll(): Promise<IComment[]> {
    return await this.prisma.comment.findMany();
  }

  async findByUser(userId: number): Promise<IComment[]> {
    await this.userService.checkIfUserExist(userId);
    return await this.prisma.comment.findMany({
      where: {
        authorId: userId,
      },
    });
  }

  async findById(commentId: number): Promise<IComment> {
    await this.checkIfCommentExist(commentId);
    return await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
  }

  async replyComment(
    userId: number,
    commentId: number,
    reply: ReplyCommentDto,
  ) {
    await this.checkIfCommentExist(commentId);
    await this.checkRoleForComments(userId);

    const simpleReply = reply.description;
    const commentMovieId = (await this.findById(commentId)).movieId;
    reply.description = await this.createCommentReplyModel(
      commentId,
      userId,
      reply.description,
    );

    const allReplies: string[] = await this.getAllRepliesById(commentId);
    const repliesUpdated: string[] = [...allReplies, simpleReply];
    await this.prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        replies: repliesUpdated,
      },
    });

    await this.userService.updateUserScore(userId);
    await this.userService.updateUserRole(userId);
    return await this.create(reply, userId, commentMovieId);
  }

  async likeCommentById(
    commentId: number,
    userEvaluatorId: number,
  ): Promise<void> {
    await this.checkIfCommentExist(commentId);
    await this.checkRoleForLike(userEvaluatorId);
    await this.likeComment(commentId);
  }

  async dislikeCommentById(
    commentId: number,
    userEvaluatorId: number,
  ): Promise<void> {
    await this.checkIfCommentExist(commentId);
    await this.checkRoleForLike(userEvaluatorId);
    await this.dislikeComment(commentId);
  }

  async quoteComment(
    userId: number,
    commentId: number,
    quote: QuoteCommentDto,
  ) {
    await this.checkIfCommentExist(commentId);
    await this.checkRoleForQuote(userId);

    const commentMovieId = (await this.findById(commentId)).movieId;
    quote.description = await this.createQuoteCommentModel(
      commentId,
      userId,
      quote.description,
    );

    const allQuotes: number[] = await this.userService.getAllQuotesById(userId);
    const quotesUpdated: number[] = [...allQuotes, commentId];

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        quotedCommentsId: quotesUpdated,
      },
    });

    await this.userService.updateUserScore(userId);
    await this.userService.updateUserRole(userId);

    return await this.create(quote, userId, commentMovieId);
  }

  async editCommentById(
    userId: number,
    commentId: number,
    dto: EditCommentDto,
  ) {
    await this.checkIfCommentExist(commentId);
    const authorId = (await this.findById(commentId)).authorId;
    const loggedUserRole: Role = await this.userService.getUserRole(userId);

    if (authorId === userId || loggedUserRole === 'MODERATOR') {
      return await this.prisma.comment.update({
        where: {
          id: commentId,
        },
        data: {
          description: dto.newDescription,
        },
      });
    }

    throw new ForbiddenException(
      'Only moderators or authors can edit comments',
    );
  }

  async deleteById(userId: number, commentId: number) {
    await this.checkIfCommentExist(commentId);

    const authorId = (await this.findById(commentId)).authorId;
    const loggedUserRole: Role = await this.userService.getUserRole(userId);
    if (authorId === userId || loggedUserRole === 'MODERATOR') {
      await this.prisma.comment.delete({
        where: {
          id: commentId,
        },
      });
      return { message: `The comment with id ${commentId} was deleted` };
    }
    await this.checkRoleForMod(userId);
  }

  async commentRepeated(userId: number, commentId: number): Promise<void> {
    await this.checkIfCommentExist(commentId);
    await this.checkRoleForMod(userId);
    await this.markCommentRepeated(commentId);
  }

  async commentNotRepeated(userId: number, commentId: number): Promise<void> {
    await this.checkIfCommentExist(commentId);
    await this.checkRoleForMod(userId);
    await this.unmarkCommentRepeated(commentId);
  }

  async checkRoleForMod(userId: number): Promise<void> {
    const authorRole: Role = await this.userService.getUserRole(userId);
    if (authorRole !== 'MODERATOR') {
      throw new ForbiddenException('Only moderators can do this action');
    }
  }

  // Methods that only are used in the comment service

  private async createCommentReplyModel(
    commentId: number,
    userId: number,
    replyMessage: string,
  ): Promise<string> {
    const repliedComment = await this.findById(commentId);
    const authorId = repliedComment.authorId;
    const authorEmail = (await this.userService.findById(authorId)).email;
    const writerEmail = (await this.userService.findById(userId)).email;
    return `Comment: ${repliedComment.description}, from @${authorEmail}, replied by @${writerEmail} with the message: ${replyMessage}`;
  }

  private async createQuoteCommentModel(
    quotedCommentId: number,
    userId: number,
    quoteMessage: string,
  ): Promise<string> {
    const quotedComment = await this.findById(quotedCommentId);
    const authorId = quotedComment.authorId;
    const authorEmail = (await this.userService.findById(authorId)).email;
    const writerEmail = (await this.userService.findById(userId)).email;
    return `Comment: ${quotedComment.description}, from @${authorEmail}, quoted by @${writerEmail} with the message: ${quoteMessage}`;
  }

  private async getAllRepliesById(commentId: number): Promise<string[]> {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    return comment.replies;
  }

  private async likeComment(commentId: number): Promise<void> {
    await this.prisma.comment.update({
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

  private async dislikeComment(commentId: number): Promise<void> {
    await this.prisma.comment.update({
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

  private async markCommentRepeated(commentId: number): Promise<void> {
    await this.prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        repeated: true,
      },
    });
  }

  private async unmarkCommentRepeated(commentId: number): Promise<void> {
    await this.prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        repeated: false,
      },
    });
  }

  private async checkRoleForComments(userId: number): Promise<void> {
    const authorRole: Role = await this.userService.getUserRole(userId);
    if (authorRole === 'READER') {
      throw new ForbiddenException('Readers can not write comments!');
    }
  }

  private async checkRoleForQuote(userId: number): Promise<void> {
    const userRole: Role = await this.userService.getUserRole(userId);
    if (userRole === 'READER' || userRole === 'BASIC') {
      throw new ForbiddenException(
        'Only Advanced and Moderators users can quote a comment!',
      );
    }
  }

  private async checkRoleForLike(userId: number): Promise<void> {
    const authorRole: Role = await this.userService.getUserRole(userId);
    if (authorRole === 'READER' || authorRole === 'BASIC') {
      throw new ForbiddenException(
        'Readers and Basic users can not like or dislike comments!',
      );
    }
  }

  private async checkIfCommentExist(commentId: number): Promise<void> {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comment) throw new BadRequestException('Comment not found');
  }

  private async create(
    dto: CreateCommentDto,
    userId: number,
    movieId: number,
  ): Promise<IComment> {
    return await this.prisma.comment.create({
      data: {
        authorId: userId,
        description: dto.description,
        likes: 0,
        dislikes: 0,
        movieId: movieId,
      },
    });
  }
}
