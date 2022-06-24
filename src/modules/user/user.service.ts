import { Injectable } from '@nestjs/common';

// import { UpdateUserDto } from './dto/update-user.dto';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService) {}

  async authUser(): Promise<AxiosResponse> {
    const resposta = await this.httpService.axiosRef
      .get('http://localhost:3000/auth/login')
      .then((res) => res.data);
    console.log(resposta);
    return resposta;
  }

  create() {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update() {
    return `This action updates a  user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
