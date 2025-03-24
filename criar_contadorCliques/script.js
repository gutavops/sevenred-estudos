console.log(typeof localStorage.getItem("contador"))
// Variável que armazena o valor do contador
let count = localStorage.getItem("contador")|| 0;

updateCounter(); // Atualiza a tela ao abrir a página

// Primeiro passo meu foi criar uma função que salva o valor do contador
function salvarLocalStorage() {
    localStorage.setItem("contador", count);
}

// Função que adiciona +1 na variável
function increaseCount() {
    count++; // Incrementa 1
    updateCounter() // Atualiza o valor na tela
    console.log("Depois de increaseCount():", count)
    salvarLocalStorage()
}

// Função que diminui -1 na variável
function decreaseCount() {
    count--; // Decrementa 1
    updateCounter() // Atualiza o valor na tela
    console.log("Depois de decreaseCount():", count)
    salvarLocalStorage()
}

function updateCounter() {
    // Seleciona o elemento <p> dentro da div com a classe "boxCounter"
    const counter = document.querySelector(".boxCounter p");

    // Atualiza o conteúdo da tag <p> com o valor atual de count
    counter.textContent = count;
}
// Testando as funções no console
console.log("Valor inicial:", count);