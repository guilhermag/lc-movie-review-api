import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { ReviewDto } from './dto';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.review.findMany();
  }

  async findByUser(userId: number) {
    return await this.prisma.review.findMany({
      where: {
        authorId: userId,
      },
    });
  }

  async findById(userId: number, reviewId: number) {
    return await this.prisma.review.findUnique({
      where: {
        authorId: userId,
        id: reviewId,
      },
    });
  }

  async create(userId: number, movieId: number, dto: ReviewDto) {
    return await this.prisma.review.create({
      data: {
        authorId: userId,
        movieScore: dto.movieScore,
        movieId: movieId,
      },
    });
  }
}
