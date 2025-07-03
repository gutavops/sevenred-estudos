# Backend do Finance App

Este diretório contém o código-fonte do backend da aplicação Finance App, responsável por gerenciar as operações de transações financeiras através de uma API RESTful.

## Visão Geral

O backend foi desenvolvido para servir como a camada de dados e lógica de negócio para o Finance App. Ele expõe endpoints para criar, listar e excluir transações, além de fornecer um resumo financeiro.

## Tecnologias Utilizadas

* **Node.js**: Ambiente de execução JavaScript.

* **TypeScript**: Superconjunto tipado de JavaScript.

* **Express**: Framework web para Node.js, utilizado para construir a API.

* **Prisma**: ORM (Object-Relational Mapper) e toolkit de banco de dados, utilizado para interagir com o banco de dados MySQL.

* **CORS**: Middleware para habilitar o Cross-Origin Resource Sharing.

* **ts-node-dev**: Ferramenta para desenvolvimento que reinicia o servidor automaticamente em mudanças de código.

* **MySQL**: Sistema de gerenciamento de banco de dados relacional (configurado via Prisma).

## Estrutura de Pastas

A estrutura do diretório `backend/src` é organizada da seguinte forma:

```
backend/
├── prisma/
│   ├── migrations/             # Histórico de migrações do banco de dados.
│   └── schema.prisma           # Definição do esquema do banco de dados e modelos Prisma.
├── src/
│   ├── controller/
│   │   └── transactionController.ts # Lógica para lidar com as requisições HTTP e chamar os serviços.
│   ├── db/
│   │   └── prisma.ts           # Instância do Prisma Client para conexão com o DB.
│   ├── dto/
│   │   └── transactionDTO.ts   # Data Transfer Objects (DTOs) para tipagem de dados.
│   ├── errors/
│   │   └── ValidationError.ts  # Classe de erro customizada para validações.
│   ├── middlewares/
│   │   └── errorHandler.ts     # Middleware global para tratamento de erros.
│   ├── routes/
│   │   └── transactionRoutes.ts # Definição das rotas da API para transações.
│   └── service/
│       └── transactionService.ts # Lógica de negócio, manipulação de dados e interação com o Prisma.
│   ├── app.ts                  # Configuração principal do Express e middlewares globais.
│   ├── server.ts               # Ponto de entrada do servidor, inicia a aplicação.
├── .env                        # Variáveis de ambiente (excluído do controle de versão).
├── .env.example                # Exemplo de variáveis de ambiente.
├── package.json                # Metadados do projeto e dependências.
├── tsconfig.json               # Configurações do TypeScript.
└── ... (outros arquivos de configuração)
```

## Configuração do Banco de Dados

Este backend utiliza **Prisma** como ORM e é configurado para se conectar a um banco de dados **MySQL**.

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do diretório `backend/` (se ainda não existir) e configure a URL do seu banco de dados:

```dotenv
DATABASE_URL="mysql://user:password@host:port/database_name"
```

Substitua `user`, `password`, `host`, `port` e `database_name` pelas credenciais do seu banco de dados MySQL.

### 2. Schema do Prisma

O esquema do banco de dados é definido em `prisma/schema.prisma`. O modelo `Transaction` representa a tabela de transações:

```prisma
model Transaction {
  id          Int      @id @default(autoincrement())
  price       Decimal  @db.Decimal(10,2)
  description String
  category    String
  type        String   // 'c' para crédito, 'd' para débito
  createdAt   DateTime @default(now())
}
```

### 3. Executando Migrações

Após configurar o `.env`, execute as migrações do Prisma para criar a tabela `Transaction` no seu banco de dados:

```bash
npx prisma migrate dev --name init
```

Este comando criará a tabela e gerará o Prisma Client.

## Instalação

Para instalar as dependências do backend, navegue até o diretório `backend/` no seu terminal e execute:

```bash
npm install
```

## Execução

Para iniciar o servidor de desenvolvimento do backend, execute o seguinte comando no diretório `backend/`:

```bash
npm run dev
```

O servidor estará executando na porta `3101` (ou a porta configurada em `server.ts`). Você verá a mensagem `Servidor executando na porta 3101` no console.

## Endpoints da API

A API expõe os seguintes endpoints sob a base `/api/finance`:

### 1. Listar Transações

* **URL:** `/api/finance`
* **Método:** `GET`
* **Descrição:** Retorna todas as transações cadastradas, juntamente com um resumo financeiro (total, crédito, débito).
* **Resposta de Sucesso (200 OK):**
    ```json
    {
      "summary": {
        "total": 1500,
        "credit": 2000,
        "debit": 500
      },
      "transactions": [
        {
          "id": 1,
          "price": 1000.00,
          "description": "Salário",
          "category": "Salário",
          "type": "c",
          "createdAt": "2023-10-26T10:00:00.000Z"
        },
        {
          "id": 2,
          "price": 500.00,
          "description": "Aluguel",
          "category": "Despesas da Casa",
          "type": "d",
          "createdAt": "2023-10-26T11:00:00.000Z"
        }
      ]
    }
    ```

### 2. Criar Nova Transação

* **URL:** `/api/finance`
* **Método:** `POST`
* **Descrição:** Cria uma nova transação no banco de dados.
* **Corpo da Requisição (JSON):**
    ```json
    {
      "price": 150.00,
      "description": "Compras no supermercado",
      "category": "Alimentação",
      "type": "d"
    }
    ```
    * `price`: (number) O valor da transação.
    * `description`: (string) Descrição da transação.
    * `category`: (string) Categoria da transação (ex: "Alimentação", "Venda", "Salário", "Despesas da Casa", "Lazer", "Outros").
    * `type`: (string) Tipo da transação ('c' para crédito, 'd' para débito).
* **Resposta de Sucesso (201 Created):**
    ```json
    {
      "id": 3,
      "price": 150.00,
      "description": "Compras no supermercado",
      "category": "Alimentação",
      "type": "d",
      "createdAt": "2023-10-26T12:00:00.000Z"
    }
    ```
* **Resposta de Erro (400 Bad Request):**
    ```json
    {
      "message": [
        "Categoria é obrigatória.",
        "Descrição é obrigatório.",
        "Preço é obrigatório.",
        "Tipo é obrigatório.",
        "O tipo da transação deve ser 'c' para crédito ou 'd' para débito."
      ]
    }
    ```

### 3. Deletar Transação

* **URL:** `/api/finance/:id`
* **Método:** `DELETE`
* **Descrição:** Exclui uma transação específica pelo seu ID.
* **Parâmetros de URL:**
    * `id`: (number) O ID da transação a ser excluída.
* **Resposta de Sucesso (200 OK)::**
    ```json
    {
      "id": 2,
      "price": 500.00,
      "description": "Aluguel",
      "category": "Despesas da Casa",
      "type": "d",
      "createdAt": "2023-10-26T11:00:00.000Z"
    }
    ```
    (Retorna a transação que foi deletada)
* **Resposta de Erro (404 Not Found):**
    ```json
    {
      "message": "Transação não encontrado para exclusão."
    }
    ```

## Tratamento de Erros

O backend inclui um middleware de tratamento de erros global (`errorHandler.ts`) que captura exceções e retorna respostas de erro padronizadas em formato JSON, com um status HTTP apropriado e uma mensagem descritiva.