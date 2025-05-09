interface Message {
    message: string;
    date: string
}

// Cria uma Array para armazenar as mensagens cadastradas
let messages: Message[] = [];

// Função chamada quando uma nova mensagem é cadastrada
function handleNewMessage(event: Event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)

    // Captura o valor do input de mensagem
    const inputMessage = document.getElementById("message") as HTMLInputElement; // declaro que esse elemento é um input e possui .value

    // Captura a data
    const today = new Date()
    const month = today.getMonth()+1
    const fullYear = today.getFullYear()
    const formatDate = `${month}/${fullYear}`

    // Cria um objeto com os dados da nova mensagem
    const newMessage: Message = {
        message: inputMessage.value, // Pega o valor digitado no campo de message
        date: formatDate //Pega a data formatada
    };

    // Adiciona a nova mensagem ao array de mensagens
    messages.push(newMessage);
    //localStorage.setItem("chave", valor)
    localStorage.setItem("messageList", JSON.stringify(messages))

    // Atualiza a exibição das mensagens na tela
    updateMessageList();

    // Limpa o campo de input após adicionar a mensagem
    inputMessage.value = "";
}

// Função para atualizar a lista de mensagens exibidas
function updateMessageList() {
    // Seleciona o elemento <section> onde as mensagens serão exibidas
    const section = document.getElementById("messageSection") as HTMLElement;

    // Limpa todas as divs da <section> antes de adicionar as novas
    section.innerHTML = "";

    // Para cada mensagem, cria um novo <div> e adiciona na <section>
    for (let message of messages) {
        // Cria uma nova div para cada mensagem
        const messageDiv = document.createElement("div");

        // Define o conteúdo da div com a mensagem
        messageDiv.innerHTML = `<p>${message.message}</p>
                                <span>${message.date}</span>`;

        // Adiciona a nova div dentro da <section>
        section.appendChild(messageDiv);
    }
}

function getMessageLocalStorage(){
    const messageLocalStorage = localStorage.getItem("messageList")
    // Verifica se existe algo no localStorage
    if (!messageLocalStorage) return;

    // Faz o parse e força o tipo como array de Message
    const messageList = JSON.parse(messageLocalStorage) as Message[];

    // Adiciona cada mensagem ao array principal
    messageList.forEach((message: Message) => {
        messages.push(message);
    });

    updateMessageList()
}

getMessageLocalStorage()