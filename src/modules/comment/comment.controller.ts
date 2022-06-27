import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto';
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

  @Get('user')
  getAllCommentsByUser(@GetUser('id') userId: number) {
    return this.commentService.findByUser(userId);
  }

  @Get(':id')
  getCommentById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) commentId: number,
  ) {
    return this.commentService.findById(userId, commentId);
  }
}
