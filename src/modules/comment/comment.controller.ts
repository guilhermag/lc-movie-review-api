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
import {
  CreateCommentDto,
  ReplyCommentDto,
  QuoteCommentDto,
  EditCommentDto,
} from './dto';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  allComments,
  changeSuccess,
  comment,
  commentNotFound,
  created,
  databaseError,
  delError,
  deleted,
  movieNotFound,
  quote,
  reply,
  userNotFound,
} from './swagger/swagger.responses';

@UseGuards(JwtGuard)
@ApiBearerAuth('JWT-auth')
@Controller('comment')
@ApiTags('Comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('movie/id-imdb?')
  @ApiOperation({ summary: 'Creates a comment using the movie imdb id' })
  @ApiResponse(created)
  @ApiResponse(movieNotFound)
  createCommentByMovieId(
    @Query('id') idIMDB: string,
    @GetUser('id') userId: number,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentService.createByIdIMDB(idIMDB, userId, dto);
  }

  @Post('movie/title?')
  @ApiOperation({ summary: 'Creates a comment using the movie title' })
  @ApiResponse(created)
  @ApiResponse(movieNotFound)
  createCommentByMovieTitle(
    @Query('title') title: string,
    @GetUser('id') userId: number,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentService.createByTitle(title, userId, dto);
  }

  @Get('')
  @ApiOperation({ summary: 'Get all the comments' })
  @ApiResponse(allComments)
  @ApiResponse(databaseError)
  getAllComments() {
    return this.commentService.findAll();
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'Get all the comments from an user in expecific' })
  @ApiResponse(allComments)
  @ApiResponse(userNotFound)
  getAllCommentsByUser(@Param('id', ParseIntPipe) userId: number) {
    return this.commentService.findByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a comment in expecific' })
  @ApiResponse(comment)
  @ApiResponse(commentNotFound)
  getCommentById(@Param('id', ParseIntPipe) commentId: number) {
    return this.commentService.findById(commentId);
  }

  @Patch('like/:id')
  @ApiOperation({ summary: 'Logged user likes a comment' })
  @ApiResponse(changeSuccess)
  @ApiResponse(commentNotFound)
  likeCommentById(
    @GetUser('id') userEvaluatorId: number,
    @Param('id', ParseIntPipe) commentId: number,
  ) {
    return this.commentService.likeCommentById(commentId, userEvaluatorId);
  }

  @Patch('dislike/:id')
  @ApiOperation({ summary: 'Logged user dislikes a comment' })
  @ApiResponse(changeSuccess)
  @ApiResponse(commentNotFound)
  dislikeCommentById(
    @GetUser('id') userEvaluatorId: number,
    @Param('id', ParseIntPipe) commentId: number,
  ) {
    return this.commentService.dislikeCommentById(commentId, userEvaluatorId);
  }

  @Post('reply/:id')
  @ApiOperation({ summary: 'Logged user replies a comment' })
  @ApiOperation(reply)
  @ApiResponse(commentNotFound)
  ReplyCommentById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) commentId: number,
    @Body() dto: ReplyCommentDto,
  ) {
    return this.commentService.replyComment(userId, commentId, dto);
  }

  @Post('quote/:id')
  @ApiOperation({ summary: 'Logged user quotes a comment' })
  @ApiResponse(quote)
  @ApiResponse(commentNotFound)
  quoteCommentById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) commentId: number,
    @Body() dto: QuoteCommentDto,
  ) {
    return this.commentService.quoteComment(userId, commentId, dto);
  }

  @Post('repeated/:id')
  @ApiOperation({ summary: 'Marks a comment as repeated' })
  @ApiResponse(changeSuccess)
  @ApiResponse(commentNotFound)
  commentRepeated(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) commentId: number,
  ) {
    return this.commentService.commentRepeated(userId, commentId);
  }

  @Post('not/repeated/:id')
  @ApiOperation({ summary: 'Marks a comment as not repeated' })
  @ApiResponse(changeSuccess)
  @ApiResponse(commentNotFound)
  commentNotRepeated(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) commentId: number,
  ) {
    return this.commentService.commentNotRepeated(userId, commentId);
  }

  @Patch('edit/:id')
  @ApiOperation(comment)
  @ApiResponse({
    status: 201,
    description: 'sucess',
  })
  @ApiResponse(commentNotFound)
  editCommentById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) commentId: number,
    @Body() dto: EditCommentDto,
  ) {
    return this.commentService.editCommentById(userId, commentId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a comment' })
  @ApiResponse(deleted)
  @ApiResponse(delError)
  deleteCommentById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) commentId: number,
  ) {
    return this.commentService.deleteById(userId, commentId);
  }
}
