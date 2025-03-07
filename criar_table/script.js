// Cria uma Array para armazenar os usuários cadastrados
let users = [] 

// Função chamada quando um novo usuário é cadastrado
function handleNewUser() {
    event.preventDefault() // Previne o comportamento padrão do formulário (recarregar a página)

    // Captura os elementos de entrada do formulário pelo ID
    const inputName = document.getElementById("name")
    const inputAge = document.getElementById("age")
    const inputEmail = document.getElementById("email")
    const inputTelephone = document.getElementById("telephone")

    // Cria um objeto com os dados do novo usuário
    const newUser = {
        name: inputName.value, // Pega o valor digitado no campo de nome
        age: inputAge.value, // Pega o valor digitado no campo de idade
        email: inputEmail.value, // Pega o valor digitado no campo de email
        telephone: inputTelephone.value // Pega o valor digitado no campo de telefone
    }

    // Adiciona o novo usuário ao array de usuários
    users.push(newUser)

    // Atualiza a tabela exibindo os usuários cadastrados
    addUserToTable()

    // Limpa os campos do formulário após adicionar o usuário
    inputName.value = ""
    inputAge.value = ""
    inputEmail.value = ""
    inputTelephone.value = ""
}

// Função para adicionar os usuários na tabela HTML
function addUserToTable() {
    // Seleciona o elemento <tbody> dentro da tabela
    const tbody = document.querySelector("table tbody") 

    // Limpa o conteúdo atual da tabela para evitar duplicações
    tbody.innerHTML = ""

    // Percorre o array de usuários e adiciona cada um na tabela
    for(let user of users) {
        // Cria uma nova linha na tabela
        const tr = document.createElement("tr")

        // Define o conteúdo da linha com os dados do usuário
        tr.innerHTML = `
            <td>${user.name}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${user.telephone}</td>
        `
        // Adiciona a linha criada dentro do <tbody>
        tbody.appendChild(tr)
    }

    // Exibe no console o conteúdo atualizado do <tbody> (apenas para depuração)
    console.log("tbody: ", tbody)

}