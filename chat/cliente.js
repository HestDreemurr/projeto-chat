const socket = new
WebSocket("wss://df36c15c-9bf4-499f-9fc1-37d3a0d51872-00-n0hngb84iljj.worf.replit.dev/") // Se conecta ao servidor WebSocket

let username = JSON.parse(localStorage.getItem("user")).nome

// Quando a conexão for estabelecida
socket.onopen = () => {
  console.log("Conexão com o WebSocket estabelecida.")
}

let mensagensEnviadas = 0

// Quando o cliente receber uma mensagem do servidor
socket.onmessage = (event) => {
  let data = JSON.parse(event.data)
  // Verifica se quem enviou a mensagem foi o servidor ou o próprio cliente
  if (data.sender != "self") {
    let chat = document.querySelector("#chat")
    let mensagem = document.createElement("div")
    mensagem.classList.add("mensagem")
    mensagem.innerText = data.mensagem
    
    let nome = document.createElement("p")
    nome.classList.add("nome-server")
    nome.innerText = data.username
    
    chat.appendChild(nome)
    chat.appendChild(mensagem)
    mensagensEnviadas = 0
  }
}

// Se houver um erro no WebSocket
socket.onerror = () => {
  alert("Houve um erro ao se conectar ao servidor WebSocket. Tente novamente.")
}

function enviarMensagem() {
  mensagensEnviadas += 1
  let input = document.querySelector("#input")
  let chat = document.querySelector("#chat")
  let mensagem = document.createElement("div")
  mensagem.classList.add("mensagem", "enviada")
  mensagem.innerText = input.value
  
  if (mensagensEnviadas == 1) {
    let nome = document.createElement("p")
    nome.classList.add("nome")
    nome.innerText = username
  
  chat.appendChild(nome)
  }
  
  chat.appendChild(mensagem)
  
  socket.send(JSON.stringify({
    mensagem: input.value,
    username: username,
    sender: "self"
  })) // Envia uma mensagem (JSON) ao servidor
  
  input.value = ""
}


function mostrarEnviar() {
  let input = document.querySelector("#input")
  let enviar = document.querySelector("#enviar")
  
  if (input.value) {
    enviar.style.display = "inline-block"
  } else {
    enviar.style.display = "none"
  }
}
