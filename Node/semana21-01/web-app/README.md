# CRUD de Usuários com React, TypeScript e Tailwind CSS

Este projeto é uma aplicação web simples de CRUD (Create, Read, Update, Delete) de usuários, desenvolvida com **React** e **TypeScript** para o frontend, e estilizada utilizando **Tailwind CSS** para um desenvolvimento ágil e responsivo. A persistência dos dados dos usuários é realizada através do `localStorage` do navegador.

---

## Funcionalidades

O sistema oferece as seguintes operações para gerenciamento de usuários:

* **Visualizar Usuários (Read):** Todos os usuários cadastrados são exibidos em uma tabela organizada.
* **Adicionar Novo Usuário (Create):** Um formulário modal permite a inserção de novos registros de usuários.
* **Editar Usuário (Update):** É possível modificar os dados de um usuário existente, reutilizando o formulário modal de adição.
* **Excluir Usuário (Delete):** Cada usuário pode ser removido da lista com uma confirmação de segurança.
* **Persistência de Dados:** Os dados dos usuários são automaticamente salvos no `localStorage` do navegador, garantindo que as informações não sejam perdidas ao recarregar a página ou fechar o navegador.

---

## Tecnologias Utilizadas

* **React:** Biblioteca JavaScript para construção de interfaces de usuário.
* **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
* **Tailwind CSS:** Framework CSS utility-first para estilização rápida e eficiente.
* **Vite:** Ferramenta de build rápida para projetos web modernos.

---

## Como Rodar o Projeto

Para executar a aplicação em seu ambiente local, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone [LINK_DO_SEU_REPOSITORIO]
    cd [NOME_DA_PASTA_DO_PROJETO]
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

    A aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada pelo Vite).

---

## Desafios Enfrentados e Soluções

Durante o desenvolvimento deste projeto, diversos problemas foram encontrados e superados. Abaixo, detalhamos os desafios e as soluções implementadas:

### 1. Erro de Permissão no `npm run dev`

* **Problema:** Ao tentar iniciar o projeto, ocorria um erro "Permission denied" seguido de "bad interpreter: Operation not permitted".
* **Causa Raiz:** O executável do Vite dentro de `node_modules/.bin` não possuía as permissões de execução adequadas, ou a instalação das dependências estava corrompida.
* **Solução:** Foi realizada uma limpeza completa das dependências e uma reinstalação.
    1.  Remoção da pasta `node_modules` e do arquivo `package-lock.json`: `rm -rf node_modules package-lock.json`
    2.  Reinstalação de todas as dependências do projeto: `npm install`
    3.  Reinício do projeto: `npm run dev`

### 2. Comportamento Incorreto dos Campos "Email" e "Telefone" na Modal

* **Problema:** Ao digitar no campo "Email", o texto aparecia no campo "Telefone". O campo "Telefone" não era atualizado corretamente. Não havia erros visíveis no console do navegador para este problema.
* **Causa Raiz:** Os `onChange` handlers (funções que atualizam o estado do componente) nos inputs de "Email" e "Telefone" estavam configurados incorretamente no `UserFormModal.tsx`. O `onChange` do "Email" estava chamando `setTelefone` em vez de `setEmail`, e o `onChange` do "Telefone" estava incompleto ou incorreto, não atualizando o estado de `telefone`.
* **Solução:** Os `onChange` handlers foram ajustados para que cada input atualizasse seu próprio estado corretamente:
    * `Email`: `onChange={(e) => setEmail(e.target.value)}`
    * `Telefone`: `onChange={(e) => setTelefone(e.target.value)}`

### 3. Tratamento do Campo "Idade" no Formulário

* **Problema:** O campo "Idade" gerava dois tipos de erros no console ao digitar:
    * `Uncontrolled -> Controlled warning`: O input iniciava sem controle (`idade` era `undefined`) e se tornava controlado ao digitar, causando um alerta do React.
    * Erro ao digitar letras (`Received NaN for the value attribute`): A conversão para `Number(e.target.value)` com valores não numéricos resultava em `NaN`, que não é aceito pelo atributo `value` do input.
* **Solução:** O `onChange` e o `value` do input "Idade" foram ajustados em `UserFormModal.tsx`:
    * `value={idade ?? ""}`: Garante que o input seja sempre controlado, exibindo uma string vazia se `idade` for `undefined`.
    * A lógica no `onChange` foi aprimorada para:
        * Resetar `idade` para `undefined` se o campo for esvaziado.
        * Converter para número e chamar `setIdade` somente se o valor for um número válido (`!isNaN(num)`).
* **Benefícios:** Mantém o input sempre controlado, evita `NaN` no estado, permite apagar o campo sem erros, e mantém a tipagem `number | undefined` do estado de forma robusta.

### 4. Reset de Campos da Modal ao Abrir para Novo Usuário

* **Problema:** Após editar um usuário, ao clicar em "Novo Usuário", os campos da modal (`UserFormModal`) ainda mostravam os dados do usuário editado, em vez de estarem vazios.
* **Causa Raiz:** Embora o `useEffect` da modal estivesse configurado para limpar os campos quando `editingUser` fosse `null`, o React, em sua otimização de re-renderização, muitas vezes reutiliza instâncias de componentes, e os `useState`s internos da modal não eram completamente reinicializados em todas as situações.
* **Solução:** Foi adicionada uma propriedade `key` ao componente `UserFormModal` em `App.tsx`. A `key` é dinâmica: `key={editingUser ? editingUser.id : 'new-user'}`. Essa mudança na `key` força o React a desmontar a instância anterior da modal e montar uma nova, garantindo que todos os `useState`s internos sejam inicializados do zero, resultando em campos limpos para um novo usuário.

### 5. Dados do `localStorage` Zerando ao Recarregar a Página

* **Problema:** Os usuários eram adicionados corretamente ao `localStorage` após a criação, mas ao recarregar a página, o `localStorage` ficava vazio e a tabela de usuários não exibia os dados.
* **Causa Raiz:** O problema ocorria devido à forma como o estado `users` era inicializado e como o `useEffect` de salvamento era acionado. No carregamento inicial, o `useState<User[]>([])` definia `users` como um array vazio. Consequentemente, o `useEffect` que observa `[users]` era disparado imediatamente com esse array vazio, **sobrescrevendo** quaisquer dados previamente salvos no `localStorage`.
* **Solução:** A lógica de carregamento dos usuários foi integrada diretamente na função de inicialização do `useState` para `users` em `App.tsx`:
    ```typescript
    const [users, setUsers] = useState<User[]>(() => {
      try {
        const saved = localStorage.getItem("users");
        if (saved) {
          return JSON.parse(saved);
        }
        return [];
      } catch (error) {
        return [];
      }
    });
    ```
    Dessa forma, o estado `users` já é inicializado com os dados do `localStorage` (se existirem) ou com um array vazio, sem a necessidade de um `useEffect` de carregamento separado. O `useEffect` de salvamento agora só é acionado quando o estado `users` *realmente muda* devido a interações do usuário, prevenindo a sobrescrita indesejada na montagem inicial.

### 6. Falta de Feedback Visual nos Botões de Ação

* **Problema:** Os botões "Editar" e "Excluir" na tabela não ofereciam feedback visual (como mudança de cor ou cursor) ao passar o mouse, o que prejudicava a usabilidade.
* **Causa Raiz:** Ausência de classes CSS que indicassem interatividade.
* **Solução:** Foram adicionadas classes do Tailwind CSS aos botões em `UserTable.tsx`:
    * `hover:bg-yellow-600` e `hover:bg-red-700`: Para alterar a cor de fundo no hover.
    * `cursor-pointer`: Para mudar o ícone do cursor para uma "mãozinha".
    * `transition-colors duration-200`: Para uma transição suave das cores, melhorando a experiência visual.