import { Module } from '@nestjs/common';
import { MovieModule } from './modules/movie/movie.module';
import { ReviewModule } from './modules/review/review.module';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, ReviewModule, MovieModule, CommentModule, PrismaModule],
})
export class AppModule {}
