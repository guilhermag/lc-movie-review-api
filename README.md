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

### Documentation

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
- [OMDb API - The Open Movie Database](http://omdbapi.com/)

## Installation

### Pre installation

To run this project you'll need [Docker.](https://www.docker.com/) and the [authentication api](https://github.com/guilhermag/lc-movie-review-auth) that is used to confirm the user sign in, so to the project work correctly in local is needed:

- Auth API running on port: 3000(default).
  - It's possible to change the default ports, just make sure to change in the project files.
  - The installation of the Auth API is documented in the respective repository.
- Docker running in background with the Postgres container, instructions ahead.
  - It's possible not use docker, just make sure to put the correct db link on the ```.env``` file.
- Both API's need to connect to the same database, so make sure that connection it's the same on the ```.env``` file.
  - The Auth API doesn't create new data, just read it from the db.

To create the postgres database with docker just clone the repository, go to the folder and run the ```docker-compose.yml``` file.

### Project installation

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

## Project execution

### Pre configuration

To run this app is needed to config the environment variables in the ```.env``` file:

```bash
# your database url for connection, that is the same of the auth api
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# your jwt secret that must be the same on this app and in the authentication api
JWT_SECRET="your-jwt-secret"

# your api key to be able of make requests in the ombd api
API_KEY_OMDB="your-api-key"
```

To get an OMDb api key you just need to register on the [api's website.](https://www.omdbapi.com/apikey.aspx)

In the root folder exists a file ```.env.example``` which serves as an example, it's possible to create a new ```.env``` or just rename the ```.env.example``` file, and fill with your environment variables.

The project is set to run on port 3333, so all the endpoints are located in the ```http://localhost:3333/...```.

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

It's possible to consult and make updates in the database locally, prisma has the [Prisma studio](https://www.prisma.io/studio), and the [documentation](https://www.prisma.io/docs/concepts/components/prisma-studio).

*Tip: Prisma studio can be helpful to change user roles, with that you can test all the features of the app, or just check de database data, like score, comments or reviews...*

```bash
# in the app folder type
$ npx prisma studio
```

### Documentation

Swagger was used to document the API, so all the app information can be found on the [Swagger endpoint (/api-docs/)](http://localhost:3333/api-docs/).

All the others scripts possibles te be used with ```npm run ...``` can be found in the ```package.json```.

## Stay in touch

- Author - Guilherme de Araujo Gabriel
- Email - [guilhermag@gmail.com](guilhermag@gmail.com)
- Github - [@guilhermag](https://github.com/guilhermag)
- LinkedIn - [Guilherme Gabriel](https://www.linkedin.com/in/guilherme-gabriel-22961610a/)
