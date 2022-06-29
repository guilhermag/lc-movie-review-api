<p align="center">
 <img src="./markdown/logo-project.png" alt="Project Logo" />
</p>

# MovieReview API

## Introduction

[Portuguese README](./markdown/portuguese/README.md).

The goal of this project was create an API for a movie review forum, where is possible to create a user, sign in with a user and do the following actions, considering the role of the user:

- Search for a movie by its title or [Imdb Id](https://www.imdb.com/).
- Post reviews and comments about movies.
- Reply or quote an existing comment.
- Like or dislike a comment.
- Mark or unmark a comment as repeated
- Delete a comment.

### Business rules and requirements

With the goal of keeping this document clean, the business rules and requirements are detailed in the files above.

- [Business rules.](./markdown/english/business-rules.md)
- [Project requirements.](./markdown/english/project-requirements.md)

### Stacks

The technologies used on this project are:

- [NestJS framework.](https://nestjs.com/)
  - [Typescript.](https://www.typescriptlang.org/)
  - [Express.](https://expressjs.com/)
- [Prisma ORM.](https://www.prisma.io/docs/getting-started/quickstart)
- [ProstgreSQL.](https://www.postgresql.org/)
- [Docker.](https://www.docker.com/)

## Installation

### Pre-installation

To run this project you'll need [Docker.](https://www.docker.com/) and the [authentication api](https://github.com/guilhermag/lc-movie-review-auth) that is used to confirm the user sign in, so to the project work correctly in local is needed:

- Auth API running on port: 3000(default).
  - It's possible to change the default ports, just make sure to change in the project files.
  - The installation of the Auth API is documented in the respective repository.
- Docker running in background with the Postgres container, instructions ahead.
  - It's possible not use docker, just make sure to put the correct db link on the ```.env``` file.

To create the postgres database with docker just clone the repository, go to the folder and run the ```docker-compose.yml``` file.

```bash
# clones the rep
$ git clone https://github.com/guilhermag/lc-movie-review-api.git
$ cd lc-movie-review-api/

# creates the database
$ npm run db:dev:up

# installing all the dependencies
$ npm install

# script used to restart the db and run all the prisma migrations
$ npm run db:dev:restart
```
### Project Installation


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
