function buscarGato() {

    fetch("https://api.thecatapi.com/v1/images/search")
    .then(response => response.json()) // Converter a resposta em JSON
    .then(data => {
        let imageUrl = data[0].url; // Pegar a URL da imagem
        document.getElementById("imagemGato").src = imageUrl; // Alterar o src da imagem
    })
    .catch(error => console.error("Erro ao buscar imagem:", error)); // Tratar erros
}

// Carregar uma imagem inicial ao abrir a página
getCat();

