<h2>CLARKE MVP</h2>

<h3>Motivação </h3>

A solução foi inspirada em conceitos do Temporal e na arquitetura de Microkernel. A proposta visa segregar o domínio da aplicação das suas extensões (**_providers_**). Uma tentativa de estimular condições de modularidade, flexibilidade e extensibilidade.

#

<h3>Instruções para executar o projeto </h3>

<h4>Executando o projeto (via Docker) </h4>

- **dependências:** docker e docker-compose

- crie o arquivo **.env** conforme o arquivo **.env.sample** na raiz do projeto

- execute o comando abaixo para subir a aplicação

```zsh
  docker compose up -d --build
```

<h3>Testes de integração</h3>

Com servidor rodando execute o comando abaixo

```zsh
  $ pnpm run test:e2e
```

_Foi implementado apenas um teste de fumaça_

#
