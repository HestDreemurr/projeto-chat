const socket = new WebSocket("wss://df36c15c-9bf4-499f-9fc1-37d3a0d51872-00-n0hngb84iljj.worf.replit.dev/")

socket.onopen = () => {
  console.log("Conexão com o WebSocket estabelecida.")
}

socket.onmessage = (event) => {
  let chat = document.querySelector("#chat")
  let mensagem = document.createElement("div")
  event.data.text().then(msg => mensagem.innerText = msg)
  chat.appendChild(mensagem)
}

function enviarMensagem() {
  let mensagem = document.querySelector("#mensagem")
  socket.send(mensagem.value)
  mensagem.value = ""
}