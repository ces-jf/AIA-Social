# AIA-Social
Projeto TCC Lucas

<h2>Instruções Docker</h2>

Com o Docker instalado em sua máquina, rode os as instruções abaixo para disponibilizar as instâncias de banco de dados necessárias.

<h4>PostgreSQL</h4>

```sh
$ docker run --name postgres -e POSTGRES_PASSWORD=tcclucas#2020 -d -p 5432:5432 postgres
```
Logo que finalizar o processo de build do container, acesse a instância criada utilizando a ferramenta [Postbird](https://www.electronjs.org/apps/postbird) e crie um banco de dados nomeado de **_tcc_db_**.

<h4>MongoDB</h4>

```sh
$ docker run --name mongo -d -p 27017:27017 mongo
```
Para visualização dos dados do MongoDB, você poderá utilizar a ferramenta [MongoDB Compass](https://www.mongodb.com/try/download/compass).

<h2>Instalação da Aplicação</h2>

Clone o repositório e rode as instruções, conforme abaixo:

```sh
$ yarn
$ yarn sequelize db:migrate
$ yarn dev
```
