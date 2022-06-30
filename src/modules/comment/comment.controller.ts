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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiBearerAuth('JWT-auth')
@Controller('comment')
@ApiTags('Comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('movie/id-imdb?')
  @ApiOperation({ summary: 'Creates a comment using the movie imdb id' })
  createCommentByMovieId(
    @Query('id') idIMDB: string,
    @GetUser('id') userId: number,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentService.createByIdIMDB(idIMDB, userId, dto);
  }

  @Post('movie/title?')
  @ApiOperation({ summary: 'Creates a comment using the movie title' })
  createCommentByMovieTitle(
    @Query('title') title: string,
    @GetUser('id') userId: number,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentService.createByTitle(title, userId, dto);
  }

  @Get('')
  @ApiOperation({ summary: 'Get all the comments' })
  getAllComments() {
    return this.commentService.findAll();
  }

  @Get('logged-user')
  @ApiOperation({ summary: 'Get all the comments from the logged user' })
  getAllCommentsOfLoggedUser(@GetUser('id') userId: number) {
    return this.commentService.findByUser(userId);
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'Get all the comments from an user in expecific' })
  getAllCommentsByUser(@Param('id', ParseIntPipe) userId: number) {
    return this.commentService.findByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a comment in expecific' })
  getCommentById(@Param('id', ParseIntPipe) commentId: number) {
    return this.commentService.findById(commentId);
  }

  @Post('reply/:id')
  @ApiOperation({ summary: 'Logged user replies a comment' })
  ReplyCommentById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) commentId: number,
    @Body() dto: ReplyCommentDto,
  ) {
    return this.commentService.replyComment(userId, commentId, dto);
  }

  @Patch('like/:id')
  @ApiOperation({ summary: 'Logged user likes a comment' })
  likeCommentById(
    @GetUser('id') userEvaluatorId: number,
    @Param('id', ParseIntPipe) commentId: number,
  ) {
    return this.commentService.likeCommentById(commentId, userEvaluatorId);
  }

  @Patch('dislike/:id')
  @ApiOperation({ summary: 'Logged user dislikes a comment' })
  dislikeCommentById(
    @GetUser('id') userEvaluatorId: number,
    @Param('id', ParseIntPipe) commentId: number,
  ) {
    return this.commentService.dislikeCommentById(commentId, userEvaluatorId);
  }

  @Post('quote/:id')
  @ApiOperation({
    summary: 'Logged user quotes a comment, and add it to his list of quotes',
  })
  quoteCommentById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) commentId: number,
    @Body() dto: QuoteCommentDto,
  ) {
    return this.commentService.quoteComment(userId, commentId, dto);
  }

  @Post('repeated/:id')
  @ApiOperation({ summary: 'Marks a comment as repeated' })
  commentRepeated(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) commentId: number,
  ) {
    return this.commentService.commentRepeated(userId, commentId);
  }

  @Post('not/repeated/:id')
  @ApiOperation({ summary: 'Marks a comment as not repeated' })
  commentNotRepeated(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) commentId: number,
  ) {
    return this.commentService.commentNotRepeated(userId, commentId);
  }

  @Patch('edit/:id')
  @ApiOperation({
    summary:
      'Logged user can edit own comment or from others if the user is a moderator',
  })
  editCommentById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) commentId: number,
    @Body() dto: EditCommentDto,
  ) {
    return this.commentService.editCommentById(userId, commentId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a comment' })
  deleteCommentById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) commentId: number,
  ) {
    return this.commentService.deleteById(userId, commentId);
  }
}
