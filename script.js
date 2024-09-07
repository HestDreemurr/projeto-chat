if (JSON.parse(localStorage.getItem("user")).nome) {
  window.location.href = "chat/chat.html"
}

function entrar() {
  let username = document.querySelector("#username").value
  
  if (username) {
    localStorage.setItem("user", JSON.stringify({
      nome: username
    }))
    
    window.location.href = "chat/chat.html"
  }
}