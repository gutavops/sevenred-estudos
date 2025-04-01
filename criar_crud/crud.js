// Crio um array para armazenar os cadastros
let cadastro = [];

// Crio objetos e adicionando ao array com push()
let pessoa1 = {
  id: 1,
  nome: "Pedro",
  email: "pedro@email.com",
  telefone: "11111",
};
let pessoa2 = {
  id: 2,
  nome: "Gustavo",
  email: "gustavo@email.com",
  telefone: "22222",
};
cadastro.push(pessoa1, pessoa2);

//leio os cadastros
console.log("Lista de cadastros: ", cadastro);

//Atualizar cadastro
function updateCadastro(id, novoNome, novoEmail, novoTelefone) {
  let index = cadastro.findIndex((pessoa) => pessoa.id === id); // Encontrar o índice
  //Se o índice for diferente de -1. A pessoa foi encontrada
  if (index !== -1) {
    let pessoaAtualizada = {
      id,
      nome: novoNome,
      email: novoEmail,
      telefone: novoTelefone,
    };
    cadastro.splice(index, 1, pessoaAtualizada);
    console.log(`Cadastro ID ${id} atualizado com sucesso!`);
  } else {
    console.log(`Cadastro ID ${id} não encontrado.`);
  }
}

updateCadastro(2, "Renato", "renato@email.com", 33333);
console.log("Lista de cadastros: ", cadastro);

//Delete excluir cadastro
function deleteCadastro(id) {
  let index = cadastro.findIndex((pessoa) => pessoa.id === id); // Encontrar o índice pelo ID
  if (index !== -1) {
    cadastro.splice(index, 1); // Remover o item pelo índice
    console.log(`Cadastro ID ${id} excluído com sucesso!`);
  } else {
    console.log(`Cadastro ID ${id} não encontrado.`);
  }
}

deleteCadastro(1);
console.log("Lista de cadastros: ", cadastro);
