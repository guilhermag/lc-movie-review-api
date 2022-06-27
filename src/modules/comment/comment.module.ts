import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';
import { MovieService } from '../movie/movie.service';

@Module({
  imports: [HttpModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
