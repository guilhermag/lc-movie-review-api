import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: UserDto) {
    return this.userService.login(dto);
  }

  @Post('create')
  create(@Body() dto: UserDto) {
    return this.userService.create(dto);
  }

  @UseGuards(JwtGuard)
  @Get('valid')
  validUser(@GetUser() user: User) {
    return user;
  }
}
