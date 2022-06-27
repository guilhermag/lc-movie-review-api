import { Module, Global } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';

@Global()
@Module({
  imports: [HttpModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService],
})
export class MovieModule {}
