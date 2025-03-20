// Variável que armazena o valor do contador
let count = 0;

// Função que adiciona +1 na variável
function increaseCount() {
    count++; // Incrementa 1
    updateCounter() // Atualiza o valor na tela
    console.log("Depois de increaseCount():", count);
}

// Função que diminui -1 na variável
function decreaseCount() {
    count--; // Decrementa 1
    updateCounter() // Atualiza o valor na tela
    console.log("Depois de decreaseCount():", count);
}

function updateCounter() {
    // Seleciona o elemento <p> dentro da div com a classe "boxCounter"
    const counter = document.querySelector(".boxCounter p");

    // Atualiza o conteúdo da tag <p> com o valor atual de count
    counter.textContent = count;
}
// Testando as funções no console
console.log("Valor inicial:", count);