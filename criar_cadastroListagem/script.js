// Criar uma Array para armazenar os cadastros
let registries = JSON.parse(localStorage.getItem("registriesList")) || []
console.log("registries:: ", registries)
addRegistriesView(registries)

//Função chamada ao clicar no botão Criar
function handleNewUser() {
  event.preventDefault();

  // Capturar os valores dos inputs
  const inputName = document.getElementById("name");
  const inputAge = document.getElementById("age");

  // Criar um objeto com os dados cadastrados
  const newUser = {
    name: inputName.value,
    age: inputAge.value,
  };

  // Adicionar o novo usuário na Array
  registries.push(newUser);

  localStorage.setItem("registriesList", JSON.stringify(registries))

  addRegistriesView(registries);
  console.log("Cadastro:: ", registries);

  // Limpa o campo de input após adicionar a mensagem
  inputName.value = "";
  inputAge.value = "";
}

function addRegistriesView(newRegistries) {
  // Seleciona o elemento <section> onde as mensagens serão exibidas
  const section = document.getElementById("listaPessoas");
  console.log(section);
  // Limpa todas as divs da <section> antes de adicionar as novas
  section.innerHTML = "";

  // Para cada cadastro, cria um novo <div> e adiciona na <section>
  for (let registry of newRegistries) {
    // Cria uma nova div para cada cadastro
    const registryDiv = document.createElement("div");

    // Define o conteúdo da div com a mensagem
    registryDiv.innerHTML = `${registry.name}<br/>${registry.age}`;

    // Adiciona a nova div dentro da <section>
    section.appendChild(registryDiv);
  }
}

function addFilterEighteenPlus() {
  const filteredRegistries = registries.filter(
    (registry) => registry.age >= 18
  );

  addRegistriesView(filteredRegistries);
}

function addFilterEighteenUnder() {
  const filteredRegistries = registries.filter((registry) => registry.age < 18);

  addRegistriesView(filteredRegistries);
}

function addFilterAll() {
  addRegistriesView(registries);
}

function searchByName() {
  const searchInput = document
    .getElementById("searchName")
    .value.toLowerCase()
    .trim();
  const filteredRegistries = registries.filter((registry) =>
    registry.name.toLowerCase().trim().includes(searchInput)
  );

  addRegistriesView(filteredRegistries);
}

// Get the input field
const input = document.getElementById("searchName");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    searchByName();
  }
});
