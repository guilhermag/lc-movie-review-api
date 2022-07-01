import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('MovieForumAPI - MovieReview')
    .setDescription(
      `Movie Forum API, where is possible to create a user, login, search for movies,
      create and search for reviews and comments, and edit then. Done by Guilherme de Araujo Gabriel`,
    )
    .setExternalDoc(
      'Business rules and repository doc.',
      'https://github.com/guilhermag/lc-movie-review-api/blob/main/markdown/english/business-rules.md',
    )
    .setVersion('1.0')
    .addTag('Users')
    .addTag('Movies')
    .addTag('Reviews')
    .addTag('Comments')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(new ValidationPipe({}));
  await app.listen(3333);
}
bootstrap();
