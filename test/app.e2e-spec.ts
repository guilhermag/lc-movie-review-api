import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import { UserDto } from '../src/modules/user/dto';

describe('Movie Review API e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({}));
    await app.init();
    await app.listen(4000);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:4000');
  });

  afterAll(() => {
    app.close();
  });

  describe('User', () => {
    const dto: UserDto = {
      email: 'emailjohndoe@email.com',
      password: '12345',
    };
    const wrongDto: UserDto = {
      email: 'notemailjohndoe@email.com',
      password: '12345',
    };
    describe('Create', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/user/create')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/user/create')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum.spec().post('/user/create').expectStatus(400);
      });
      it('should create an user', () => {
        return pactum
          .spec()
          .post('/user/create')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('Login', () => {
      it('should login', () => {
        return pactum
          .spec()
          .post('/user/login')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
      it('should throw if credentials are wrong', () => {
        return pactum
          .spec()
          .post('/user/login')
          .withBody(wrongDto)
          .expectStatus(403);
      });
    });

    describe('Get current User', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/user/valid')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });
  });

  describe('Movies', () => {
    describe('Get movie by imdb id - omdb', () => {
      it.todo('should get current user');
    });

    describe('Get movie by title - omdb', () => {
      it.todo('should get current user');
    });

    describe('Get all the movies in database', () => {
      it.todo('should get current user');
    });

    describe('Get all the comments from a movie', () => {
      it.todo('should get current user');
    });

    describe('Get all the review from a movie', () => {
      it.todo('should get current user');
    });

    describe('Get movie by id', () => {
      it.todo('should get current user');
    });
  });

  describe('Comments', () => {
    describe('Get comments', () => {
      it.todo('should get current user');
    });

    describe('Get all comments from User', () => {
      it.todo('should get current user');
    });

    describe('Get comment by Id', () => {
      it.todo('should get current user');
    });

    describe('Create comment', () => {
      it.todo('should get current user');
    });

    describe('Edit comment', () => {
      it.todo('should get current user');
    });

    describe('Delete comment', () => {
      it.todo('should get current user');
    });
  });

  describe('Reviews', () => {
    describe('Get reviews', () => {
      it.todo('should get current user');
    });

    describe('Get all reviews from User', () => {
      it.todo('should get current user');
    });

    describe('Get review by Id', () => {
      it.todo('should get current user');
    });

    describe('Create review', () => {
      it.todo('should get current user');
    });

    describe('Edit review', () => {
      it.todo('should get current user');
    });

    describe('Delete review', () => {
      it.todo('should get current user');
    });
  });
});
