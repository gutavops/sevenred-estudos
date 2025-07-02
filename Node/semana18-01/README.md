# Projeto Finance App

## Visão Geral e Objetivo da Aplicação

Este projeto, desenvolvido como parte da Semana 18, tem como principal objetivo proporcionar uma experiência prática na construção de uma aplicação full-stack. Ele visa aplicar e consolidar conhecimentos adquiridos em React para o desenvolvimento do frontend e Node.js para o backend, resultando em um aplicativo funcional para gerenciamento de finanças pessoais.

O **Finance App** permite aos usuários controlar seus ganhos e gastos de forma intuitiva, oferecendo uma visão clara da sua saúde financeira.

## Funcionalidades Principais

O aplicativo oferece as seguintes funcionalidades essenciais:

* **Criação de Transações:** Registre novas transações com os seguintes detalhes:
    * **Descrição:** Um breve texto sobre a transação.
    * **Valor:** O montante financeiro da transação.
    * **Categoria:** Seleção de categorias pré-definidas (Alimentação, Venda, Salário, Despesas da Casa, Lazer, Outros).
    * **Tipo de Transação:** Indicação se é uma **entrada** ou **saída**.
* **Resumo Financeiro (Summary):** Visualize um painel de resumo que exibe:
    * Total de Entradas.
    * Total de Saídas.
    * Saldo Total (Entradas - Saídas).
* **Listagem e Filtragem de Transações:**
    * Todas as transações são exibidas em formato de tabela.
    * Barra de pesquisa para filtrar transações por descrição ou outros critérios.

## Tecnologias Utilizadas

Este projeto é uma aplicação full-stack, construída com as seguintes tecnologias principais:

* **Frontend:**
    * React
    * Vite 
    * TypeScript
    * Axios 
    * Bootstrap
    * PhosphorIcons 
* **Backend:**
    * Node.js
    * TypeScript
    * Express 
    * Prisma 
    * CORS 
    * ts-node-dev 

## Estrutura de Pastas

O projeto está organizado em duas pastas principais, separando claramente as responsabilidades do frontend e do backend:

```
Semana18-01/
├── backend/
│   ├── src/
│   ├── package.json
│   └── ... (arquivos do backend)
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ... (arquivos do frontend)
└── README.md (Este arquivo)
```

* **`backend/`**: Contém todo o código e configurações relacionados à API RESTful que gerencia os dados financeiros.
* **`frontend/`**: Contém todo o código-fonte da interface do usuário, desenvolvida em React.

## Instruções de Instalação e Execução

Para obter instruções detalhadas sobre como instalar e executar o frontend e o backend, por favor, consulte os `README.md` específicos em suas respectivas pastas:

* [Instruções do Backend](./backend/README.md)
* [Instruções do Frontend](./frontend/README.md)

## Possíveis Melhorias ou Limitações

* **Usuários:** Atualmente, o aplicativo não possui um sistema de usuários,a implementação de usuários permitiria que diferentes pessoas utilizem o aplicativo e gerenciem suas próprias finanças de forma isolada.
