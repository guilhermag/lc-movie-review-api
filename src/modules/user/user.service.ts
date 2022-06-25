import { ForbiddenException, Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

import { PrismaService } from '../../prisma/prisma.service';

import { UserDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    private prisma: PrismaService,
  ) {}

  async authenticate(): Promise<AxiosResponse> {
    const resposta = await this.httpService.axiosRef
      .get('http://localhost:3000/auth/login')
      .then((res) => res.data);
    console.log(resposta);
    return resposta;
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
        select: {
          id: true,
          email: true,
          name: true,
        },
      });
      return user;
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
}
