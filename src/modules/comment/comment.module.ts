import { Global, Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PassportModule } from '@nestjs/passport';

@Global()
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
