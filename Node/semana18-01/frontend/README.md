# Frontend do Finance App

Este diretório contém o código-fonte da interface do usuário (frontend) da aplicação Finance App. Desenvolvido com React e TypeScript, ele permite aos usuários interagir com o backend para gerenciar suas transações financeiras.

## Visão Geral

O frontend é a parte da aplicação com a qual o usuário interage diretamente. Ele exibe um resumo financeiro, uma lista de transações, permite a criação de novas transações e a busca por transações existentes. A comunicação com o backend é feita através de requisições HTTP.

## Tecnologias Utilizadas

* **React**: Biblioteca JavaScript para construção de interfaces de usuário.

* **Vite**: Ferramenta de build rápida para projetos web modernos.

* **TypeScript**: Superconjunto tipado de JavaScript, para maior robustez do código.

* **Axios**: Cliente HTTP baseado em Promises para fazer requisições à API do backend.

* **Bootstrap**: Framework CSS para design responsivo e componentes de UI.

* **React-Bootstrap**: Implementação de componentes Bootstrap para React.

* **Phosphor Icons**: Biblioteca de ícones para enriquecer a interface visual.

## Funcionalidades da Interface

A interface do usuário oferece as seguintes funcionalidades:

* **Header com Título e Botão de Nova Transação**: Exibe o título da aplicação e um botão para abrir o modal de criação de transação.

* **Modal de Nova Transação**: Um formulário modal para registrar novas transações, incluindo:

  * Descrição

  * Valor (Preço)

  * Categoria (seleção pré-definida)

  * Tipo (Entrada/Saída)

* **Resumo Financeiro (Summary)**: Três cards que exibem o total de entradas, total de saídas e o saldo total.

* **Barra de Pesquisa de Transações**: Permite filtrar as transações exibidas na tabela por descrição.

* **Tabela de Transações**: Lista todas as transações, formatando o valor como moeda e a data. Inclui um botão para deletar transações.

## Estrutura de Pastas

A estrutura do diretório `frontend/src` é organizada da seguinte forma:

```
frontend/
├── src/
│   ├── App.tsx                 # Componente principal da aplicação, orquestra os demais.
│   ├── App.css                 # Estilos CSS globais da aplicação.
│   ├── main.tsx                # Ponto de entrada da aplicação React.
│   ├── index.css               # Estilos CSS básicos e importação do Bootstrap.
│   ├── components/
│   │   ├── Header.tsx          # Componente do cabeçalho da aplicação.
│   │   ├── NewTransactionModal.tsx # Componente do modal para criar novas transações.
│   │   ├── Summary.tsx         # Componente para exibir o resumo financeiro.
│   │   ├── TransactionSearch.tsx # Componente da barra de pesquisa de transações.
│   │   └── TransactionsTable.tsx # Componente da tabela que lista as transações.
│   └── assets/                 # (Vazio neste projeto, mas destinado a imagens e outros recursos estáticos)
├── public/                     # Arquivos estáticos que são servidos diretamente (ex: index.html).
├── package.json                # Metadados do projeto e dependências.
├── tsconfig.json               # Configurações do TypeScript.
└── ... (outros arquivos de configuração)

```

## Instalação

Para instalar as dependências do frontend, navegue até o diretório `frontend/` no seu terminal e execute:

```bash
npm install

```

## Execução

Para iniciar o servidor de desenvolvimento do frontend, execute o seguinte comando no diretório `frontend/`:

```bash
npm run dev

```

O aplicativo será iniciado e estará acessível no seu navegador, geralmente em `http://localhost:5173` (ou uma porta similar, indicada pelo Vite no terminal).

## Integração com o Backend

O frontend se comunica com a API do backend, que deve estar rodando na porta `3101`. Todas as requisições HTTP são feitas utilizando a biblioteca `Axios` para o endpoint base `http://localhost:3101/api/finance`.

Certifique-se de que o [backend](./backend/README.md) esteja em execução antes de iniciar o frontend para que a aplicação funcione corretamente.

## Estilização

A estilização da aplicação é feita utilizando um arquivo CSS customizado (`App.css`) que define variáveis de cores e estilos para os componentes, além da integração com o Bootstrap para componentes de UI e responsividade.

## Possíveis Melhorias

* **Paginação e Filtragem Avançada:** Implementar paginação para listagens de transações e opções de filtragem mais complexas (por data, por valor, etc.).