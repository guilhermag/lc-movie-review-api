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
import { CreateUserDto, LoginUserDto, ResponseUserDto } from './dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import {
  created,
  invalidCredentials,
  login,
  loginLimit,
  newMod,
  notMod,
  wrongCredentials,
} from './swagger/responses.swagger';

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ApiOperation({ summary: 'Creates a user' })
  @ApiResponse(created)
  @ApiResponse(invalidCredentials)
  create(@Body() dto: CreateUserDto): Promise<ResponseUserDto> {
    return this.userService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Sign in with a user' })
  @ApiResponse(login)
  @ApiResponse(wrongCredentials)
  @ApiResponse(loginLimit)
  login(@Body() dto: LoginUserDto) {
    return this.userService.login(dto);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('JWT-auth')
  @Patch('newmod/:id')
  @ApiOperation({ summary: 'Turns a user into a moderator' })
  @ApiResponse(newMod)
  @ApiResponse(notMod)
  turnUserIntoMod(
    @GetUser('id') loggedUserId: number,
    @Param('id', ParseIntPipe) userId: number,
  ) {
    return this.userService.turnIntoMod(loggedUserId, userId);
  }
}
