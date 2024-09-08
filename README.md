<h1 align="center">The Best Seller</h1>
The Best Seller é um projeto de e-commerce para a venda de livros. Este projeto está em desenvolvimento e tem como objetivo ser uma plataforma completa para a compra e venda de livros, com foco inicial na criação da interface de usuário para registro e login, autenticação, gerenciamento de carrinho de compras, favoritos e mais. A plataforma será futuramente aprimorada com a implementação de formas de pagamento.

## **Funcionalidades**
### *Cadastro e Login de Usuário*
+ Registro e login com autenticção JWT.
+ Proteção de rotas admin e comum por meio de middleware de autenticação.

### *API RESTful*
+ Backend desenvolvido com Node.js e Express, seguindo a arquitetura RESTful.
+ Rotas para gerenciamento de usuários, produtos (livros), favoritos e carrinho de compras.
+ Paginação para facilitar a navegação entre os produtos.

### *Gerenciamento de Carrinho de Compras*
+ Implementação do Redis para manter o cache do carrinho do usuário.
+ Adicionar, remover e atualizar itens no carrinho.

### *Lista de Favoritos*
+ Os usuários podem adicionar livros à sua lista de favoritos para referência futura.
+ A lista de favoritos é armazenada no banco de dados e pode ser gerenciada a partir do frontend.

### *Paginação*
+ Paginação nas listagens de produtos para melhorar a usabilidade e performance da aplicação.

## **Tecnologias Utilizadas**
### *Frontend*
+ Vue.js
+ Vuex

### *Backend*
+ Node.js Express.js
+ Knex.js
+ Redis
+ Autenticação JWT

### *Banco de Dados*
+ MySQL

## **Como Executar o Projeto**
### *Pré-requisitos*
+ Node.js instalado
+ MySQL instalado e rodando
+ Redis instalado e rodando
+ Um arquivo .env configurado conforme o .env.example no raíz do backend

### *1. Clone o repositório*
```
$ git clone https://github.com/sadiegoc/the-best-seller.git
$ cd the-best-seller
```
### *2. Instale as dependências*
```
# backend
$ cd backend
$ npm install --save

# frontend
$ cd frontend
$ npm install --save
```
### *3. Configure o banco de dados*
```
# crie o banco de dados no MySQL:
mysql> CREATE DATABASE the_best_seller;

# Execute as migrações e seeders para configurar as tabelas e dados iniciais:
$ knex migrate:latest
$ knex seed:run
```
### *4. Inicie o backend*
```
$ npm start
```
### *5. Inicie o frontend*
```
$ npm run serve
```

## **Licença**
Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE para mais detalhes.
