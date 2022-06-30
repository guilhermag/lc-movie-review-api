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
    - Pode avaliar (review) um filme, com uma nota de 0 a 10.
    - Pode editar seus próprios reviews.
    - o READER se torna um usuário BASIC quando atinge uma pontuação de 20 pontos.
  - BASIC.
    - Pode fazer tudo que o READER faz.
    - Pode escrever comentários.
    - Pode responder comentários.
    - Pode editar seus próprios comentários.
    - o BASIC se torna um usuário ADVANCED quando atinge uma pontuação de 100 pontos.
  - ADVANCED.
    - Pode fazer tudo que o BASIC faz.
    - Pode citar comentários de outras pessoas.
    - Pode dar like ou dislike em um comentário.
    - o ADVANCED se torna um usuário MODERATOR quando atinge uma pontuação de 1000 pontos.
  - MODERATOR.
    - Existem 2 maneiras de se tornar um MODERATOR.
      - Alcançando um score de 1000 pontos.
      - Ter ser cargo alterado por outro MODERATOR.
    - Pode fazer tudo que o ADVANCED faz.
    - Pode editar um comentário, incluíndo o de outros usuários.
    - Pode editar um review, incluíndo o de outros usuários.
    - Pode marcar ou desmarcar um comentário como repetido.
    - Pode deletar um review.
    - Pode deletar um comentário.

[Link para o documento principal.](./README.md)
