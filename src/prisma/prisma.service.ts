import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgres://rckjxdst:ZX4kO1zg4-gOVfze1TbXR9RQupotXRw7@motty.db.elephantsql.com/rckjxdst',
        },
      },
    });
  }
}
