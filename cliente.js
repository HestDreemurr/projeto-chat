const socket = new WebSocket("wss://df36c15c-9bf4-499f-9fc1-37d3a0d51872-00-n0hngb84iljj.worf.replit.dev/")

socket.onopen = () => {
  console.log("Conexão com o WebSocket estabelecida.")
}

socket.onmessage = (event) => {
  let data;
  event.data.json().then(data => data = data)
  if (data.sender != "self") {
    let chat = document.querySelector("#chat")
    let mensagem = document.createElement("div")
    mensagem.classList.add("mensagem")
    mensagem.innerText = data.mensagem
    chat.appendChild(mensagem)
  }
}

function enviarMensagem() {
  let input = document.querySelector("#input")
  let chat = document.querySelector("#chat")
  let mensagem = document.createElement("div")
  mensagem.classList.add("mensagem", "enviada")
  mensagem.innerText = input.value
  chat.appendChild(mensagem)
  
  socket.send(JSON.stringify({
    mensagem: input.value,
    sender: "self"
  }))
  
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
