# Projeto Fastify com Swagger

Este projeto é uma aplicação de servidor utilizando Fastify e Swagger para documentação de API. Ele inclui rotas para operações CRUD em tarefas e um banco de dados rodando no Docker.

## Requisitos

- Node.js v20.17.0 ou superior
- npm ou yarn
- Docker

## Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/Anderson-Dias-Farias/fastify-swagger-api.git
    cd fastify-swagger-api
    ```

2. Instale as dependências:
    ```bash
    npm install
    # ou
    yarn install
    ```

3. Inicie o banco de dados no Docker:
    ```bash
    docker-compose up -d
    ```

## Uso

1. Inicie o servidor:
    ```bash
    npm start
    # ou
    yarn start
    ```

2. Acesse a documentação do Swagger em:
    ```
    http://localhost:3100/docs
    ```

## Estrutura do Projeto

- `src/server.ts`: Configuração principal do servidor Fastify.
- `src/routes/tasks.ts`: Definição das rotas relacionadas a tarefas.
- `docker-compose.yml`: Configuração do banco de dados no Docker.

## Rotas

### GET /tasks
Retorna todas as tarefas.

### POST /tasks
Cria uma nova tarefa.

### PUT /tasks/update/:id
Atualiza uma tarefa pelo ID.

### DELETE /tasks/delete/:id
Deleta uma tarefa pelo ID.

## Banco de Dados

O projeto utiliza um banco de dados PostgreSQL rodando no Docker. Certifique-se de que o Docker está instalado e em execução antes de iniciar o servidor.

### Comandos Docker

- Para iniciar o banco de dados:
    ```bash
    docker-compose up -d
    ```

- Para parar o banco de dados:
    ```bash
    docker-compose down
    ```

## Contribuição

1. Faça um fork do projeto.
2. Crie uma nova branch (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`).
4. Faça um push para a branch (`git push origin feature/nova-feature`).
5. Crie um novo Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.