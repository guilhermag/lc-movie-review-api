# Regras de negócio

## Introdução

O MovieReview API é um app para criar usuários, logar com as credenciais do usuário, criar reviews(notas) ou comentários, interagir com outros usuários com respostas e citações de seus comentários.

## Descrição

- Na MovieReview API é possível criar um novo usuário.
  - Usuários são criados com email e senha.
  - Um email de usuário é único.
  - Todos os novos usuários começam com o cargo READER.
- Existem 4 tipos de cargos de usuários no app.
  - Todo novo usuário começa com pontuação(score) 0.
  - Todas as seguintes ações aumentam a pontuação em 1 ponto:
    - Dar nota(review) para um filme.
    - Criar um comentário.
    - Citar um comentário.
    - Responder um comentário.
  - READER.
    - Pode logar e procurar por um filme.
      - Pode ver as informações de um filme e seus comentários.
    - Can sign in and search for a movie.
      - Can see the informations of a movie and its comments.
    - Can review a movie and give it a score, from 0 to 10.
    - A READER turns into a BASIC user when their score reaches 20 points.
  - BASIC.
    - Can do everything that a READER does.
    - Can write comments.
    - Can reply comments.
    - A BASIC turns into a ADVANCED user when their score reaches 100 points.
  - ADVANCED.
    - Can do everything that a BASIC does.
    - Can quote comments from others.
    - Can like or dislike a comment.
    - A ADVANCED turns into a MODERATOR user when their score reaches 1000 points.
  - MODERATOR.
    - There is 2 ways of a user turns into a moderator:
      - Reaching a score of 1000 poins.
      - Getting turned into a moderator by another moderator.
    - Can do everything that a ADVANCED does.
    - Can mark or unmark a comment as repeated.
    - Can delete a comment.

[Link para o documento principal.](./README.md)
