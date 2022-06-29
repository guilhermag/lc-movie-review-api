# Requisitos de projeto

## Requisitos funcionais

- Um usuário não poderá logar sem ter feito um cadastro
- Um usuário não poderá ver filmes e comentários e notas sem estar logado
- Um usuário não poderá criar, editar ou excluir comentários e notas sem estar logado
- Um usuário de um determinado perfil não poderá realizar ações que não fazem parte de seu perfil
- Todas as funcionalidade de seu sistema devem receber um token de autenticação, gerados pela sua API de autorização
- Um usuário não autenticado(que não possui o token) não poderá realizar ações no sistema.
- Um usuário com token invalido não poderá realizar ações no sistema.
- Todas as tentativas falhas de login devem ser salvas em um cache.
- Caso um usuário tente 3 vezes logar e erre, na 4 vez deverá ser retornado uma mensagem de “limite de tentativas excedido “

## Requisitos não funcionais

- Armazenar os dados e um banco de dados da sua escolha.
- Crie um cache para tentativas de login, o cache pode ser utilizando um provedor de cache.
- Desenvolver a api em uma dessas seguintes linguagens:
  - Java.
  - C#.
  - Typescript/Javascript.
  - Python.
- Os dados dos filmes deve vir de uma api externa, como o OMDb API.
- Crie uma documentação para o seu projeto, onde tenha um passo a passo de como podemos executar a aplicação e demais informações que você achar necessário colocar no acrescentar sobre o projeto.

[Link para o documento principal.](./README.md)
