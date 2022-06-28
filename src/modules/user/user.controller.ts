import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexUserSwagger } from './swagger/index-user.swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ApiOperation({ summary: 'Creates a user' })
  @ApiResponse({
    status: 201,
    description: 'New user created with success',
    type: IndexUserSwagger,
    isArray: false,
  })
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Sign in with a user' })
  login(@Body() dto: LoginUserDto) {
    return this.userService.login(dto);
  }
}
