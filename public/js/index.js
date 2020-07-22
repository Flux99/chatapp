
const socket=io('http://localhost:3000')


const messageContainer=document.getElementById("message-container")
const messageForm=document.getElementById("send-conatainer")
const messageInput=document.getElementById("message-input")
const messageTyping=document.getElementById("message-Typing")
const messageElementdiv=document.createElement('div')
const name=prompt("what is your name ?")
appendMessage("You Join",name)
socket.emit('new-user',name)
socket.on("chat-message",data=>{
    appendMessage(`${data.name}:${data.message}`)
    //console.log(data); 
});

socket.on("user-connected",name=>{
    appendMessage(`${name} connected`)
    //console.log(data); 
});
socket.on("user-disconnected",name=>{
    appendMessage(`${name} disconnected`)
    //console.log(data); 
});

socket.on("typing",data=>{
//     //appendMessage(`${name} disconnected`)
    appendTyping(`${data} is Typing...`)
    //console.log(data); 
});

// socket.on('typing', function(data){
//     appendTyping(`${data} is Typing...`)
// //     feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
//  });



messageInput.addEventListener("keydown", event => {
    if(messageInput.value.length > 0){
        socket.emit('typing', messageInput.value);
        console.log("typing"+messageInput.value);
        
      }
    
    // do something
  });


messageForm.addEventListener('submit',e=>{
    e.preventDefault()
    const message=messageInput.value
    appendMessage(`You:${message}double tik`
    // , function(){
    //         // Action after append is completly done
    //         console.log("Double tik");
    //      }
    );
    // })
    socket.emit('send-chat-message',message)
    messageInput.value=''
});

function appendMessage(message){
    
    const messageElement=document.createElement('div')
    messageElementdiv.innerText=""
    messageElement.innerText=message
    messageContainer.append(messageElement)
}

function appendTyping(message){
    //const messageElementdiv=document.createElement('div')
    messageElementdiv.innerText=message
    //if(messageTyping.innerText===null){
        messageTyping.append(messageElementdiv)
    //}  
}
// $( document ).ready(function() {
//     console.log( "ready!" );
//     alert("Working");
// });
