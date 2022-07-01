import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IndexUserSwagger } from './swagger/index-user.swagger';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

@Controller('user')
@ApiTags('Users')
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
  @ApiResponse({
    status: 404,
    description: 'fail',
  })
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Sign in with a user' })
  @ApiResponse({
    status: 201,
    description: 'sucess',
  })
  @ApiResponse({
    status: 404,
    description: 'fail',
  })
  login(@Body() dto: LoginUserDto) {
    return this.userService.login(dto);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('JWT-auth')
  @Patch('newmod/:id')
  @ApiOperation({ summary: 'Turns a user into a moderator' })
  @ApiResponse({
    status: 201,
    description: 'sucess',
  })
  @ApiResponse({
    status: 404,
    description: 'fail',
  })
  turnUserIntoMod(
    @GetUser('id') loggedUserId: number,
    @Param('id', ParseIntPipe) userId: number,
  ) {
    return this.userService.turnIntoMod(loggedUserId, userId);
  }
}
