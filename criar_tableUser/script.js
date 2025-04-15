let userList = JSON.parse(localStorage.getItem("userList")) || [];
console.log("Users:: ", userList);
let userIdToUpdate;
// C = Create
function handleNewUser() {
  const name = document.getElementById("newUserName");
  const email = document.getElementById("newUserEmail");
  const age = document.getElementById("newUserAge");

  const newUser = {
    id: new Date().toISOString(),
    name: name.value,
    email: email.value,
    age: age.value,
  };

  userList.push(newUser);

  localStorage.setItem("userList", JSON.stringify(userList));

  //Limpa os campos
  name.value = "";
  email.value = "";
  age.value = "";

  listUsers();
  hideModal("modalNewUser");
}

// R = Read
function listUsers() {
  // Seleciona o elemento <tbody> dentro da tabela
  const tbody = document.querySelector("table tbody");

  // Limpa o conteúdo atual da tabela para evitar duplicações
  tbody.innerHTML = "";

  // Percorre o array de usuários e adiciona cada um na tabela
  userList.forEach((user) => {
    // Cria uma nova linha na tabela
    const tr = document.createElement("tr");

    // Define o conteúdo da linha com os dados do usuário
    tr.innerHTML = `
        <td id="name-${user.id}">${user.name}</td>
        <td id="email-${user.id}">${user.email}</td>
        <td id="age-${user.id}">${user.age}</td>
        <td class="phosphorIcons">
        <button onclick="handleDeleteUser('${user.id}')"><i class="ph ph-trash"></i></button>
        <button 
        onclick="handleOpenModalUpdateUser('${user.id}')"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#modalEditUser"
        >
        <i class="ph ph-note-pencil"></i>
        </button>
        </td>
        `;
    // Adiciona a linha criada dentro do <tbody>
    tbody.appendChild(tr);
  });
  // Exibe no console o conteúdo atualizado do <tbody> (apenas para depuração)
  const textTableEmpty = document.getElementById("textTableEmpty");
  if (userList.length > 0) {
    textTableEmpty.style = "display:none";
  } else {
    textTableEmpty.style =
      "display:flex text-align: center padding-block: 16px font-size: 20px color: #D9D9D9";
  }
}

function handleOpenModalUpdateUser(userId) {
  // Obtém os elementos da tabela com os dados do usuário
  const nameUser = document.getElementById(`name-${userId}`);
  console.log(nameUser);
  const emailUser = document.getElementById(`email-${userId}`);
  const ageUser = document.getElementById(`age-${userId}`);

  // Obtém os inputs da modal de edição
  const inputName = document.getElementById("editName");
  const inputEmail = document.getElementById("editEmail");
  const inputAge = document.getElementById("editAge");

  // Preenche os inputs com os dados do usuário selecionado
  inputName.value = nameUser.innerText; //Isso pega somente o texto que está dentro do elemento HTML, sem tags, sem nada.
  inputEmail.value = emailUser.innerText;
  inputAge.value = ageUser.innerText;

  userIdToUpdate = userId;
}

// U = Update

function handleUpdateUser() {
  const name = document.getElementById("editName");
  const email = document.getElementById("editEmail");
  const age = document.getElementById("editAge");

  const user = {
    id: userIdToUpdate,
    name: name.value,
    email: email.value,
    age: age.value,
  };

  const indexOldUser = userList.findIndex((user) => user.id === userIdToUpdate);

  userList.splice(indexOldUser, 1, user);

  localStorage.setItem("userList", JSON.stringify(userList));

  //Limpa os campos
  name.value = "";
  email.value = "";
  age.value = "";

  listUsers();
  hideModal("modalEditUser");
}
// D = Delete

function handleDeleteUser(userId) {
  const index = userList.findIndex((user) => user.id === userId);
  userList.splice(index, 1);
  localStorage.setItem("userList", JSON.stringify(userList));

  listUsers();
}
//Fechar a modal
function hideModal(idModal) {
  //Remove o foco da modal antes de fechá-la
  document.getElementById("buttonNewUser").focus();
  const modal = bootstrap.Modal.getInstance(document.getElementById(idModal));
  modal.hide();
}

function searchUser() {
  const searchInput = document
    .getElementById("searchUser")
    .value.toLowerCase()
    .trim();
    if (!searchInput) {
      console.log("searchInput:: ",searchInput)
      userList = JSON.parse(localStorage.getItem("userList")) || [];
      return listUsers();
  }

  const filteredUsers = userList.filter(
    (user) =>
      user.name.toLowerCase().trim().includes(searchInput) ||
      user.email.toLowerCase().trim().includes(searchInput) ||
      user.age.toLowerCase().trim().includes(searchInput)
  );

  userList = filteredUsers;
  listUsers();
}

// Get the input field
const input = document.getElementById("searchUser");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    searchUser();
  }
});

listUsers();
