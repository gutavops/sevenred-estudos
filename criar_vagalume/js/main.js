fetch('https://www.vagalume.com.br/news/index.js')
  .then(response => response.json())
  .then(data => {

      // Seleciona o elemento <section> onde as mensagens serão exibidas
      const section = document.getElementById("news");
  
      // Limpa todas as divs da <section> antes de adicionar as novas
      section.innerHTML = "";
    data.news.forEach(object => {
        console.log("Object:: ", object)
        const isFavorite = localStorage.getItem(object.id) || "false"
        const icon = isFavorite == "true" ? '<i class="ph-fill ph-heart"></i>' : '<i class="ph ph-heart"></i>'
    
        // Cria uma nova div para cada mensagem
        const card = document.createElement("div");
        card.setAttribute('class', 'card')
        card.setAttribute('id', object.id)
        // Define o conteúdo da div com a mensagem
        card.innerHTML = `<div class="cardHeader">
                <span class="date">${object.inserted}</span>
                <button class="icon" onclick="isFavoriteClick('${object.id}')">
                    ${icon}
                </button>
            </div>
            <a href="${object.url}" target="_blank">
                ${object.headline}
            </a>
            <p>
                ${object.kicker}
            </p>`;

        // Adiciona a nova div dentro da <section>
        section.appendChild(card);
    })
    })
  .catch(error => {
    console.log(`Erro na requisição ${error}`)
  })
  
  function dateFormat(date) {

    const dateOnly = date.slice(0, 10)
  
    const newdate = dateOnly.split("-").reverse().join("-")
  
    const dateFormated = new Date(newdate).toLocaleDateString('pt-BR', { year: "numeric", month: "short", day: "numeric" })
  
    return dateFormated
  }

  function isFavoriteClick(cardId) {
    const isFavorite = localStorage.getItem(cardId) || "false"

    const newValue = isFavorite == "true" ? "false" : "true"
    
    localStorage.setItem(cardId, newValue)
    
    const card = document.getElementById(cardId)
    const iconClass = card.querySelector('.icon')
    
    const icon = newValue == "true" ? '<i class="ph-fill ph-heart"></i>' : '<i class="ph ph-heart"></i>'
    iconClass.innerHTML = icon
}