<p align="center">
 <img src="../logo-project.png" alt="Project Logo" />
</p>

# MovieReview API

## Introdução

[README em inglês](../../README.md).

O objetivo desse projeto foi criar uma API para um forúm de avaliação de filmes, aonde é possível criar usuários, logar com esse usuário e fazer as seguintes ações, levando em conta o cargo do usuário no sistema.

- Pesquisar por um filme pelo seu título ou [Imdb Id](https://www.imdb.com/).
- Postar notas(reviews) e comentários sobre filmes.
- Responder ou citar um comentário existente.
- Marcar como gostei ou não gostei um comentário.
- Marcar ou desmarcar um comentário como repetido.
- Deletar um comentário.

### Documentação

Com o intuito de deixar esse documento o mais limpo possível, as regras de negócio e requisitos foram detalhadas nos arquivos abaixo.

- [Regras de negócio.](./business-rules.md)
- [Requisitos de projeto.](./project-requirements.md)

### Stacks

As tecnologias utilizada para esse projeto foram:

- [NestJS framework.](https://nestjs.com/)
  - [Typescript.](https://www.typescriptlang.org/)
  - [Express.](https://expressjs.com/)
- [Prisma ORM.](https://www.prisma.io/docs/getting-started/quickstart)
- [ProstgreSQL.](https://www.postgresql.org/)
- [Docker.](https://www.docker.com/)
- [OMDb API - The Open Movie Database](http://omdbapi.com/)

## Instalação

### Pré-instalação

Para rodar esse projeto será necessário o [Docker.](https://www.docker.com/) e a [api de autenticação](https://github.com/guilhermag/lc-movie-review-auth) que é usada para confirmar o login do usuário, dessa forma para que o projeto funcione corretamente é necessário:

- Auth API rodando na porta: 3000(padrão).
  - É possível mudar as portas padrões, apenas se certifique de alterar nos arquivos do projeto.
  - A instalação da Auth API é documentada no seu respectivo repositório.
- Docker rodando no background com um Postgres container, mais isntruções posteriormente.
  - É possível não utilizar o docker, só se certifique de colocar o link correto para o db no arquivo ```.env```.
- Ambas as APIs precisam se conectar ao mesmo banco de dados, então certifique-se que essa conexão é a mesma nos arquivos ```.env```.
  - A Auth API não cria nenhum dado novo, apenas confere os dados do db.

Para criar o banco de dados com o docker apenas clone o repositório, vá para  a sua pasta e rode o o arquivo ```docker-compose.yml```.

### Instalação do projeto

```bash
# clona o rep
$ git clone https://github.com/guilhermag/lc-movie-review-api.git
$ cd lc-movie-review-api/

# cria o database
$ npm run db:dev:up

# instala todas as dependências
$ npm install

# script usado para reiniciar o banco de dados e rodar todas as migrations do prisma
$ npm run db:dev:restart
```

## Execução do projeto

### Pré-configuração

Para rodar esse app é preciso configurar as variáveis de ambiente utilizadas no projeto pelo arquivo ```.env```.

```bash
# sua url de coneção com o banco de dados
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# seu segredo jwt, precisar ser o mesmo utilizado na Auth Api
JWT_SECRET="your-jwt-secret"

# a sua api key para conseguir fazer requisições para a ombd api
API_KEY_OMDB="your-api-key"
```

Para adquirir uma chave do OMBDB pode ser requisitado pelo [site da api.](https://www.omdbapi.com/apikey.aspx)

Na para raiz existe um arquivo ```.env.example``` ele serve como um exemplo/modelo, é possível criar um novo ```.env```  ou simplesmente renomear o arquivo ```.env.example```, e preenchê-lo com as suas variáveis de ambiente.

O projeto foi configurado para rodar na porta 3333, logo todos os endpoinst estarão locarizados em ```http://localhost:3333/...```.


### Rodando o app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

É possível consultar e fazer alterações no banco a partir do localhost, o prisma possuí o [Prisma studio](https://www.prisma.io/docs/concepts/components/prisma-studio), e a  [documentação](https://www.prisma.io/docs/concepts/components/prisma-studio).

*Dica: O prisma studio pode ser útil para mudar cargos, dessa forma tendo acesso a todas as funcionalidades do app, ou checar dados do banco de dados, como pontuação, comentários...*

```bash
# na pasta do projeto digite
$ npx prisma studio
```

### Documentação

O Swagger foi utilizado para documentar essa API, então toda a informação do app pode ser encontrada no [Swagger endpoint (/api-docs/)](http://localhost:3333/api-docs/).

Todos os outros scripts possíveis de serem utilizados com ```npm run ...``` podem ser encontrados no ```package.json```.

## Contato

- Autor - Guilherme de Araujo Gabriel
- Email - [guilhermag@gmail.com](guilhermag@gmail.com)
- Github - [@guilhermag](https://github.com/guilhermag)
- LinkedIn - [Guilherme Gabriel](https://www.linkedin.com/in/guilherme-gabriel-22961610a/)
