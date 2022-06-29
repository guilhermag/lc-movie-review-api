import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateUserDto, LoginUserDto, Role } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    private prisma: PrismaService,
  ) {}

  // Methods related to the user controller

  async login(dto: LoginUserDto): Promise<AxiosResponse> {
    try {
      return await this.httpService.axiosRef
        .post('http://localhost:3000/auth/user', {
          email: dto.email,
          password: dto.password,
        })
        .then((res) => res.data);
    } catch (error) {
      const errorReqStatus: number = error.toJSON().status;

      if (errorReqStatus === 401)
        throw new UnauthorizedException('Credentials Invalid');

      if (errorReqStatus === 403)
        throw new ForbiddenException(
          'Number of login attempts was exceeded, wait for 2 MINUTES',
        );
    }
  }

  async create(dto: CreateUserDto) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          password: hash,
          score: 0,
        },
      });
      delete user.password;
      return user;
    } catch (error) {
      // trying to save with unique field
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exists');
        }
      }
      throw new BadRequestException('User email or password invalid');
    }
  }

  // Methods related with other modules

  async findById(userId: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async getUserScore(userId: number): Promise<number> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user.score;
  }

  async updateUserScore(userId: number) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        score: {
          increment: 1,
        },
      },
    });
    return user.score;
  }

  async getUserRole(userId: number): Promise<Role> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user.role;
  }

  async alterUserRole(userId: number, newRole: Role) {
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: newRole,
      },
    });
  }

  async updateUserRole(userId: number) {
    const userScore: number = await this.getUserScore(userId);
    switch (true) {
      case userScore < 20:
        break;
      case userScore < 100:
        await this.alterUserRole(userId, 'BASIC');
        break;
      case userScore < 1000:
        await this.alterUserRole(userId, 'ADVANCED');
        break;
      case userScore >= 1000:
        await this.alterUserRole(userId, 'MODERATOR');
        break;
      default:
        break;
    }
  }

  async getAllQuotesById(userId: number): Promise<number[]> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user.quotedCommentsId;
  }

  async checkIfUserExist(userId: number) {
    const user = await this.findById(userId);
    if (!user) {
      throw new BadRequestException('User does not exists');
    }
  }
}
