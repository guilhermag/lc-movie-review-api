import { Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

import { UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService) {}

  async authenticate(): Promise<AxiosResponse> {
    const resposta = await this.httpService.axiosRef
      .get('http://localhost:3000/auth/login')
      .then((res) => res.data);
    console.log(resposta);
    return resposta;
  }

  create(dto: UserDto) {
    return 'This action adds a new user';
  }
}
