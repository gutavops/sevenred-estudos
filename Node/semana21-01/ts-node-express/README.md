# Projeto: ts-node-express - Análise e Resolução de Problemas

Este repositório contém uma aplicação Node.js com Express e TypeScript, utilizando Prisma para interação com o banco de dados PostgreSQL. O objetivo deste projeto foi identificar e resolver erros intencionais (e potenciais não intencionais) na aplicação, aplicando boas práticas de desenvolvimento e depuração.

## Funcionalidades Esperadas da Aplicação:

A aplicação deve oferecer as seguintes funcionalidades:

### Gerenciamento de Usuários:

* **Criar um usuário:** `name` (string), `email` (string), `cpf` (string), `phone` (string), `age` (number, opcional).

* **Listar todos os usuários.**

* **Listar um usuário por ID.**

* **Editar um usuário.**

* **Deletar um usuário.**

### Gerenciamento de Transações:

* **Cadastrar uma transação por usuário:** `description` (string), `price` (number), `category` (string), `type` ("D" | "C"), `userId` (string).

* **Deletar uma transação de um usuário.**

* **Obter dados das transações por usuário.**

* **Retornar dados das transações com resumo por usuário.**

## Configuração do Ambiente

Para rodar a aplicação localmente, siga os passos abaixo:

1.  **Clone o repositório:**

    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd ts-node-express
    ```

2.  **Verifique o arquivo `.env`:**
    Certifique-se de que o arquivo `.env` na raiz do projeto contém as seguintes variáveis (ou similar):

    ```env
    DATABASE_URL="postgresql://admin:admin@localhost:5432/user?schema=public"
    PORT=8000
    ```

3.  **Inicie o banco de dados com Docker Compose:**

    ```bash
    docker-compose up -d
    ```

    Isso iniciará um contêiner PostgreSQL na porta `5432`.

4.  **Instale as dependências:**

    ```bash
    npm install
    ```

5.  **Gere o cliente Prisma:**

    ```bash
    npx prisma generate
    ```

6.  **Aplique as migrações do Prisma:**

    ```bash
    npx prisma migrate dev --name init
    ```

    Se perguntado para resetar o banco de dados, digite `y` e pressione Enter.

7.  **Inicie a aplicação em modo de desenvolvimento:**

    ```bash
    npm run dev
    ```

    A aplicação estará disponível em `http://localhost:8000`.

## Relatório de Erros Identificados e Soluções Aplicadas

Abaixo, detalhamos os erros encontrados durante a análise do projeto `ts-node-express`, suas causas e as soluções implementadas. Cada item descreve o comportamento inesperado, a investigação realizada e as correções aplicadas.

---

### Erro 1: Incompatibilidade de Tipos e Lógica Invertida em `getUserByIDService`

**Localização:**

* `src/controller/userController.ts` (linha 42): `const user = await getUserByIDService(id)`

* `src/service/userService.ts` (definição da função `getUserByIDService`)

**Descrição do Problema:**
A aplicação falhava ao iniciar com o erro de compilação do TypeScript: `TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.` Isso ocorria porque a função `getUserByIDService` esperava um `number` como `id`, mas o `userController.ts` passava um `string` (`req.params.id`). Além disso, a lógica de validação dentro de `getUserByIDService` estava invertida, lançando um erro de "não encontrado" se o usuário *fosse* encontrado.

**Análise e Identificação:**
A mensagem de erro do TypeScript foi clara. A revisão do `schema.prisma` confirmou que os IDs do Prisma são strings (`cuid()`), indicando que o tipo `number` na função do serviço estava incorreto. A inspeção da condição `if (user)` revelou a lógica invertida.

**Solução Aplicada:**

1.  **Alterado o tipo do parâmetro `id` em `getUserByIDService` para `string`**.

2.  **Corrigida a lógica de validação** dentro de `getUserByIDService`: a condição `if (user)` foi alterada para `if (!user)`, garantindo que o erro "Usuário não encontrado" seja lançado apenas quando o usuário realmente não for encontrado.

---

### Erro 2: Incompatibilidade de Tipos em `deleteTransactionService`

**Localização:**

* `src/service/transactionService.ts` (linhas 33 e 41)

* Definição da função `deleteTransactionService` em `src/service/transactionService.ts`

**Descrição do Problema:**
A aplicação falhava ao iniciar com o erro `TS2322: Type 'number' is not assignable to type 'string'.` em `src/service/transactionService.ts`. Isso ocorria porque a função `deleteTransactionService` estava definida para receber um `id` do tipo `number`, mas o Prisma esperava um `id` do tipo `string` para transações.

**Análise e Identificação:**
A mensagem de erro do TypeScript indicou que o parâmetro `id` da função `deleteTransactionService` estava tipado incorretamente como `number`.

**Solução Aplicada:**
**Alterado o tipo do parâmetro `id` em `deleteTransactionService` de `number` para `string`**.

---

### Erro 3: Campo `age` Não Salvo na Criação do Usuário

**Localização:** `src/service/userService.ts` (função `createUserService`)

**Descrição do Problema:**
Ao criar um novo usuário via `POST /api/users`, o campo `age` enviado no corpo da requisição não era salvo no banco de dados, retornando `null` na resposta, mesmo quando um valor era fornecido.

**Análise e Identificação:**
A inspeção do objeto `data` passado para `prisma.user.create()` revelou que o campo `age` não estava sendo incluído explicitamente.

**Solução Aplicada:**
**Adicionado o campo `age: newUser.age`** ao objeto `data` dentro da função `createUserService`, garantindo que o valor de `age` seja passado para o Prisma e salvo no banco de dados.

---

### Erro 4: `getUsersService` Retornando Apenas um Usuário

**Localização:** `src/service/userService.ts` (função `getUsersService`)

**Descrição do Problema:**
A função `getUsersService` deveria listar *todos* os usuários, mas estava utilizando `prisma.user.findFirst()`, que retorna apenas o primeiro registro.

**Análise e Identificação:**
A inconsistência entre o comportamento observado (apenas um usuário retornado) e a funcionalidade esperada (listar todos os usuários) levou à identificação do uso incorreto de `findFirst`.

**Solução Aplicada:**
**Alterado o método `prisma.user.findFirst()` para `prisma.user.findMany()`** dentro da função `getUsersService`.

---

### Erro 5: Atribuição Incorreta de CPF em `updateUserService`

**Localização:** `src/service/userService.ts` (função `updateUserService`)

**Descrição do Problema:**
Ao atualizar um usuário via `PUT /api/users/:id`, o campo `cpf` estava sendo atualizado com o valor do `email` (`cpf: userData.email`) em vez do `cpf` correto (`cpf: userData.cpf`).

**Análise e Identificação:**
Revisão do do campo `cpf` onde estava `cpf: userData.email`.

**Solução Aplicada:**
**Corrigida a atribuição do campo `cpf` para `cpf: userData.cpf`** no objeto `data` da operação de atualização.

---

### Erro 6: Atribuição Incorreta de `type` em `createTransactionService`

**Localização:** `src/service/transactionService.ts` (função `createTransactionService`)

**Descrição do Problema:**
Ao cadastrar uma nova transação via `POST /api/transactions`, o campo `type` (que deveria ser "D" ou "C") estava sendo indevidamente preenchido com o valor do campo `category`.

**Análise e Identificação:**
A inspeção do objeto `data` passado para `prisma.transaction.create()` revelou que a linha de atribuição do `type` usava `newTransaction.category` em vez de `newTransaction.type`.

**Solução Aplicada:**
**Corrigida a atribuição do campo `type` para `type: String(newTransaction.type)`** no objeto `data` da operação de criação da transação.

---

### Erro 7: `getTransactionsByUserService` Não Filtrando por Usuário e Cálculo Incorreto do Resumo

**Localização:** `src/service/transactionService.ts` (função `getTransactionsByUserService`)

**Descrição do Problema:**

1.  A função `getTransactionsByUserService` deveria retornar transações *apenas* para um `userId` específico, mas estava usando `prisma.transaction.findMany()` sem nenhum filtro, retornando todas as transações de todos os usuários.

2.  O cálculo de `credit` e `debit` dentro da função estava incorreto, somando o valor da transação *mais o próprio valor acumulado* (`value + value_acumulated`), resultando em valores inflacionados.

**Análise e Identificação:**
A funcionalidade esperada era "Retornar dados das transações com resumo *por usuário*". A revisão da query do Prisma revelou a ausência do filtro `where: { userId: userId }`. A inspeção da lógica de soma (`forEach`) mostrou a adição duplicada do valor acumulado.

**Solução Aplicada:**

1.  **Adicionado o filtro `where: { userId: userId }`** à query `prisma.transaction.findMany()`.

2.  **Corrigida a lógica de soma** para `credit += transaction.price.toNumber()` e `debit += transaction.price.toNumber()`, removendo a adição duplicada do valor acumulado.