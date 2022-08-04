const socket = io()
let username;
let form = document.querySelector('.send__message')
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    username = prompt('Please enter your name: ')
} while(!username)
sendMessage(`${username.toUpperCase()} joined the chat`)
textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const msg=textarea.value
    sendMessage(msg)
})

function sendMessage(message) {
    let msg = {
        user: username,
        message: message
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}