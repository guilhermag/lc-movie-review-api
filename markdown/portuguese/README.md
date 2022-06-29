<p align="center">
 <img src="../logo-project.png" alt="Project Logo" />
</p>

# MovieReview API

## Introdução

[README em inglês](./markdown/portuguese/README.md).

O objetivo desse projeto foi criar uma API para um forúm de avaliação de filmes, aonde é possível criar usuários, logar com esse usuário e fazer as seguintes ações, levando em conta o cargo do usuário no sistema.

- Pesquisar por um filme pelo seu título ou [Imdb Id](https://www.imdb.com/).
- Postar notas(reviews) e comentários sobre filmes.
- Responder ou citar um comentário existente.
- Marcar como gostei ou não gostei um comentário.
- Marcar ou desmarcar um comentário como repetido.
- Deletar um comentário.

### Regras de negócio e requisitos do projeto

Com o intuito de deixar esse documento o mais limpo possível, as regras de negócio e requisitos foram detalhadas nos arquivos abaixo.

- [Regras de negócio.](./business-rules.md)
- [Requisitos de projeto.](./project-requirements.md)

### Stacks

The technologies used on this project are:

- [NestJS framework.](https://nestjs.com/)
  - [Typescript.](https://www.typescriptlang.org/)
  - [Express.](https://expressjs.com/)
  - Testing: [PactumJS.](https://pactumjs.github.io/) 
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
# your database url for connection
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# your jwt secret that must be the same on this app and in the authentication api
JWT_SECRET="your-jwt-secret"

# your api key to be able of make requests in the ombd api
API_KEY_OMDB="your-api-key"
```

In the root folder exists a file ```.env.example``` which serves as an example, it's possible to create a new ```.env``` or just rename the ```.env.example``` file, and fill with your environment variables.

The project is set to run on port 3333, so all the endpoints are located in the ```http://localhost:3333/...```.

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

### Documentation

Swagger was used to document the API, so all the app information can be found on the [Swagger endpoint (/api-docs/)](http://localhost:3333/api-docs/).
## Test

For this app just end to end test were made, they can be accessed with the following commands.

```bash
# e2e tests
$ npm run test:e2e
```

All the others scripts possibles te be used with ```npm run ...``` can be found in the ```packge.json```

## Stay in touch

- Author - Guilherme de Araujo Gabriel
- Email - [guilhermag@gmail.com](guilhermag@gmail.com)
- Github - [@guilhermag](https://github.com/guilhermag)
- LinkedIn - [Guilherme Gabriel](https://www.linkedin.com/in/guilherme-gabriel-22961610a/)
