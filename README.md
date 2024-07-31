<h2>CLARKE MVP</h2>

<h3>Motivação </h3>

A solução foi inspirada no padrão de arquitetura de Microkernel e no paradigma funcional. A proposta visa segregar o domínio da aplicação das suas extensões (providers). Uma tentativa de estimular condições de modularidade, flexibilidade e extensibilidade.

#

<h3>Instruções para executar o projeto </h3>

<h4>Executando o projeto (via Docker) </h4>

- **dependências:** docker e docker-compose

- crie o arquivo **.env** conforme o arquivo **.env.sample** na raiz do projeto

- execute o comando abaixo para subir a aplicação

```zsh
  docker compose up -d --build
```
