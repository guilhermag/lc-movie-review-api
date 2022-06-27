import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Query,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto, CommentAnswerDto, CommentVoteDto } from './dto';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

@UseGuards(JwtGuard)
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('movie/id-imdb?')
  createCommentByMovieId(
    @Query('id') idIMDB: string,
    @GetUser('id') userId: number,
    @Body() dto: CommentDto,
  ) {
    return this.commentService.createByIdIMDB(idIMDB, userId, dto);
  }

  @Post('movie/title?')
  createCommentByMovieTitle(
    @Query('title') title: string,
    @GetUser('id') userId: number,
    @Body() dto: CommentDto,
  ) {
    return this.commentService.createByTitle(title, userId, dto);
  }

  @Get('')
  getAllComments() {
    return this.commentService.findAll();
  }

  @Get('logged-user')
  getAllCommentsOfLoggedUser(@GetUser('id') userId: number) {
    return this.commentService.findByUser(userId);
  }

  @Get('user/:id')
  getAllCommentsByUser(@Param('id', ParseIntPipe) userId: number) {
    return this.commentService.findByUser(userId);
  }

  @Get(':id')
  getCommentById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) commentId: number,
  ) {
    return this.commentService.findById(userId, commentId);
  }

  @Post(':id')
  answerCommentById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) commentId: number,
    @Body() dto: CommentAnswerDto,
  ) {
    return this.commentService.answerComment(userId, commentId, dto);
  }

  @Patch('vote/:id')
  likeOrDislikeComment(
    @GetUser('id') userEvaluatorId: number,
    @Param('id', ParseIntPipe) commentId: number,
    @Body() dto: CommentVoteDto,
  ) {
    return this.commentService.likeOrDislikeComment(
      commentId,
      userEvaluatorId,
      dto,
    );
  }

  @Delete(':id')
  deleteCommentById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) commentId: number,
  ) {
    return this.commentService.deleteById(userId, commentId);
  }
}
