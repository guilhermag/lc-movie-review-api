import { ForbiddenException, Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

import { PrismaService } from '../../prisma/prisma.service';

import { UserDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async login(dto: UserDto): Promise<AxiosResponse> {
    try {
      const response = await this.httpService.axiosRef
        .post('http://localhost:3000/auth/user', {
          email: dto.email,
          password: dto.password,
        })
        .then((res) => res.data);
      return response;
    } catch (error) {
      const errorReqStatus: number = error.toJSON().status;

      if (errorReqStatus === 403)
        throw new ForbiddenException('Credentials Invalid');

      if (errorReqStatus === 401)
        throw new ForbiddenException(
          'Number of login attempts was exceeded, wait for 2 MINUTES',
        );
    }
  }

  async create(dto: UserDto) {
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
      return this.signToken(user.id, user.email);
    } catch (error) {
      // trying to save with unique field
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exists');
        }
      }
      throw error;
    }
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
