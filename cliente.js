const socket = new WebSocket("http://localhost:8080")

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
    
    event.data.text().then(msg => mensagem.innerText = msg)
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