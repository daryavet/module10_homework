const wsUri = "wss://echo-ws-service.herokuapp.com";
function pageLoaded(){
    const infoText = document.querySelector(".info"),
    chatScreen = document.querySelector(".chat"),
    inpValue = document.querySelector(".text"),
    sendBtn = document.querySelector(".send"),
    geoBtn = document.querySelector(".geo");

const socket = new WebSocket(wsUri);

socket.onopen = () => {
  infoText.innerText = "Соединение установлено"
};

socket.onerror =()=>{
  infoText.innerText = "Ошибка подключения"
};
socket.onmessage = (event)=>{
    writeToChat(event.data, true);
  };
 
 function toChat(){
    let sandMes = inpValue.value;
    if(inpValue.value){
        chatScreen.innerHTML +=`<div class ="chat_message send-j">${sandMes}</div>`
    }
    
 }

  sendBtn.addEventListener('click', ()=>{
    
    let message = inpValue.value;
    toChat(addMessage);
    socket.send(message);
    addMessage(message);
    inpValue.value = ""
  });

  function addMessage(message, classIn='resived-j'){
    if(!inpValue.value){
        infoText.innerText = "пустое сообщение"
        return;
    } else {
        infoText.innerText = "сообщение отправлено";
        
    }
    let messHtml = `<div class ="${classIn} chat_message">${message}</div>`;
    let chat = chatScreen.innerHTML;
    chatScreen.innerHTML = chat+messHtml;
  };
  
  function addLink(link){
    let linkHtml =`<a href="${link}" target="_blank" id="geoLink" style="text-decoration: none;">Геопозиция</a>`;
    let chat = chatScreen.innerHTML;
    chatScreen.innerHTML = chat + linkHtml;
  };
 const error =()=>{
    let error ="Геопозиция не определена";
    addMessage(error);
 }
  const success = (position)=>{
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    let link = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    addLink(link)
  }


  geoBtn.addEventListener('click', ()=>{
    if(!navigator.geolocation){
        infoText.innerText ="вы не можете использовать геопозицию"
    } else {
        navigator.geolocation.getCurrentPosition(success,error);
    }

  });


}

document.addEventListener("DOMContentLoaded", pageLoaded);


