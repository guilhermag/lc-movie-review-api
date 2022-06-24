import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('authentication')
  authUser() {
    return this.userService.authenticate();
  }

  @Post('create')
  create(@Body() dto: UserDto) {
    return this.userService.create(dto);
  }
}
