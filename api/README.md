# <p align="center"> Next Level Week #04 - Rocketseat </p>

Semana [NLW4](https://nextlevelweek.com/inscricao/4) de conteúdo sobre Node.js, express e typescript.

Créditos: [Rocketseat](https://https://rocketseat.com.br/)

#### Typescript
Para utilização do typescript no projeto junto ao `ts-node-dev`, o mesmo deve ser instalado como modo de desenvolvimento, inicializado e devidamente configurado.
Abaixo os comandos utilizados no projeto.

Instalação do Typescript:
`yarn add typescript -D`
`yarn add ts-node-dev -D`

Inicialização e geração do `tsconfig.json`:
`tsc --init`

Configurações utilizadas:
```json
"target": "es5",
"module": "commonjs",
"strict": false,
"strictPropertyInitialization": false,
"esModuleInterop": true,
"experimentalDecorators": true,
"emitDecoratorMetadata": true,
"skipLibCheck": true,
"forceConsistentCasingInFileNames": true
```

`package.json`:
```json
"scripts": {
  "dev": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts",
},
```

#### TypeORM
O CLI do typeorm foi configurado nos scripts do `package.json`.
```json
"scripts": {
  "typeorm": "ts-node-dev node_modules/typeorm/cli.js"
},
```

Abaixo os comandos que foram utilizados no projeto.

Criação de migration:
`yarn typeorm migration:create -n NomeDaTabela`

Rodar migrations:
`yarn typeorm migration:run`

Desfaz a última migration:
`yarn typeorm migration:revert`

#### Testes Automatizados.
1. Testes unitários:
> Testes para testar uma funcionalidade/feature/service de um código, utilizado em *TDD*.

2. Testes de integração:
> request -> routes -> controller -> repository
>
> <- repository <- controller <- response

3. Ponta a Ponta (E2E):
> Teste para testar toda a ação do usuário numa aplicação, mas utilizado no front-end.

Instalando o jest para criação de testes:
`yarn add jest @types/jest -D`
`yarn add ts-jest -D`

Para auxiliar com `requests` na criação dos testes foi instalado o `supertest`
`yarn add supertest @types/supertest -D`

Inicializando configurações:
`yarn jest --init`

Também foi necessário a instalação do `cross-env` para configuração de ambiente no windows, para que os testes sejam feitos em ambiente de teste.
`yarn add cross-env -D`

Configurações no `script` em `package.json`
```json
"test": "cross-env NODE_ENV=test jest",
"posttest": "rm ./src/database/database.test.sqlite"
```

Rodando os testes:
`yarn test`
