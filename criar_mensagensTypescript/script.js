// Cria uma Array para armazenar as mensagens cadastradas
var messages = [];
// Função chamada quando uma nova mensagem é cadastrada
function handleNewMessage(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)
    // Captura o valor do input de mensagem
    var inputMessage = document.getElementById("message");
    // Captura a data
    var today = new Date();
    var month = today.getMonth() + 1;
    var fullYear = today.getFullYear();
    var formatDate = "".concat(month, "/").concat(fullYear);
    // Cria um objeto com os dados da nova mensagem
    var newMessage = {
        message: inputMessage.value, // Pega o valor digitado no campo de message
        date: formatDate //Pega a data formatada
    };
    // Adiciona a nova mensagem ao array de mensagens
    messages.push(newMessage);
    //localStorage.setItem("chave", valor)
    localStorage.setItem("messageList", JSON.stringify(messages));
    // Atualiza a exibição das mensagens na tela
    updateMessageList();
    // Limpa o campo de input após adicionar a mensagem
    inputMessage.value = "";
}
// Função para atualizar a lista de mensagens exibidas
function updateMessageList() {
    // Seleciona o elemento <section> onde as mensagens serão exibidas
    var section = document.getElementById("messageSection");
    // Limpa todas as divs da <section> antes de adicionar as novas
    section.innerHTML = "";
    // Para cada mensagem, cria um novo <div> e adiciona na <section>
    for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
        var message = messages_1[_i];
        // Cria uma nova div para cada mensagem
        var messageDiv = document.createElement("div");
        // Define o conteúdo da div com a mensagem
        messageDiv.innerHTML = "<p>".concat(message.message, "</p>\n                                <span>").concat(message.date, "</span>");
        // Adiciona a nova div dentro da <section>
        section.appendChild(messageDiv);
    }
}
function getMessageLocalStorage() {
    var messageLocalStorage = localStorage.getItem("messageList");
    // Verifica se existe algo no localStorage
    if (!messageLocalStorage)
        return;
    // Faz o parse e força o tipo como array de Message
    var messageList = JSON.parse(messageLocalStorage);
    // Adiciona cada mensagem ao array principal
    messageList.forEach(function (message) {
        messages.push(message);
    });
    updateMessageList();
}
getMessageLocalStorage();
