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
    git clone https://github.com/gutavops/sevenred-estudos/tree/main/Node/semana21-01/web-app
    cd web-app
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

* **Problema Original:** O campo "Idade" do formulário gerava dois tipos de problemas no console ao digitar:
    * `Uncontrolled -> Controlled warning`: O input iniciava sem controle (pois o estado `idade` era `undefined` no início) e se tornava controlado apenas quando o usuário digitava algo, gerando um alerta do React.
    * `Erro ao digitar letras (Received NaN for the value attribute)`: A conversão para `Number(e.target.value)` com valores não numéricos (como "abc") resultava em `NaN`. O React não aceita `NaN` como valor para o atributo `value` de um input controlado, o que causava o erro e travava o campo.

* **Causa Raiz do Problema Original:** Esses problemas aconteciam porque o estado `idade` era inicialmente `undefined` e o valor do input era atribuído diretamente sem tratamento para `undefined` ou para entradas não numéricas que resultassem em `NaN`.

* **Solução Aplicada (Atual no Código):** Para abordar esses problemas e melhorar o controle do campo, as seguintes alterações foram feitas no `UserFormModal.tsx` para o input de idade:
    * **Estado:** O estado `idade` foi modificado para aceitar `null` como um valor válido para representar a ausência de um número: `const [idade, setIdade] = useState<number | null>(null);`. No `useEffect` de reset, `setIdade(null)` é usado para limpar.
    * **Atributo `value`:** O `value` do input foi ajustado para `value={idade ?? ""}`. Isso garante que o input sempre receba uma string (vazia se `idade` for `null`), mantendo-o como um componente controlado.
    * **Atributo `type`:** O atributo `type="number"` foi adicionado ao input. Isso instrui o navegador a exibir controles numéricos (como setas) e a restringir a digitação a caracteres numéricos, melhorando a experiência do usuário.

### 4. Modal "Novo Usuário" Vem Preenchida Após Criação de Usuário

* **Problema:** Após criar um usuário com sucesso, ao clicar novamente no botão "Novo Usuário", a modal `UserFormModal` abria com os campos preenchidos com os dados do usuário recém-criado, em vez de vir completamente vazia. Curiosamente, se um usuário fosse editado (abrindo e fechando a modal no modo de edição) antes de abrir a modal para um novo usuário, os campos vinham vazios corretamente.

* **Causa Raiz:** Este comportamento está relacionado à forma como o React otimiza a renderização de componentes usando a propriedade `key`.
    * A `key` do `UserFormModal` era `key={editingUser ? editingUser.id : 'new-user'}`.
    * Quando criava um usuário e clicava em "Novo Usuário" novamente, `editingUser` permanecia `null`, o que fazia com que a `key` fosse sempre a mesma string estática: `'new-user'`.
    * Como a `key` não mudava, o React interpretava que era a *mesma instância* do componente `UserFormModal` e, por otimização, não a desmontava e remontava completamente. Isso permitia que o estado interno do `UserFormModal` (os `useState`s dos campos `name`, `email`, `idade`, `telefone`) retivesse os valores da criação anterior, mesmo com o `useEffect` tentando redefini-los.
    * No cenário de "editar e depois novo", a `key` mudava de um `id` do usuário para `'new-user'`, forçando o React a remontar o componente, o que garantia um estado limpo.

* **Solução Aplicada:** Para garantir que a modal de "Novo Usuário" sempre inicie com os campos limpos, a `key` do `UserFormModal` foi modificada para ser sempre única ao criar um novo usuário.
    * **Adição de um novo estado em `App.tsx`:**
        ```typescript
        const [newFormKey, setNewFormKey] = useState(Date.now());
        ```
        Este estado armazena um valor único que será usado como `key` para a modal no modo "Novo Usuário".
    * **Atualização da `key` no botão "Novo Usuário":**
        No `onClick` do botão "Novo Usuário", `setNewFormKey(Date.now())` foi adicionado. Isso garante que cada vez que o botão é clicado, uma nova `key` única é gerada.
        ```typescript
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setEditingUser(null);
            setNewFormKey(Date.now()); // Gera uma nova key para cada clique
            setShowModal(true);
          }}
        >
          Novo Usuário
        </button>
        ```
    * **Ajuste da `key` no `UserFormModal`:**
        A propriedade `key` do `UserFormModal` foi atualizada para usar este novo estado:
        ```typescript
        <UserFormModal
          key={editingUser ? editingUser.id : newFormKey} // Usa o id do usuário ou a nova key única
          // ... outras props
        />
        ```

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