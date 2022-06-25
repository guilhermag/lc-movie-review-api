import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [HttpModule, JwtModule.register({})],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
