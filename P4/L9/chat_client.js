console.log("Ejecutando cliente JS...");

//-- Obtener los elementos del DOM
const display = document.getElementById("display");
const msg = document.getElementById("msg");
const send = document.getElementById("send");
const name = document.getElementById("name_client");
const register = document.getElementById("reg_client");

//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();

//-- Se ha recibido el evento 'hello':
//-- Es el mensaje de bienvenida del servidor
socket.on('hello', (msg) => {
  //-- Mostrarlo en la consola del navegador, para
  //-- depurar
  console.log("Mensaje del servidor: " + msg);
  //-- Ponerlo en el párrafo display
  display.innerHTML = msg;
});

//-- Se ha recibido un mensaje
socket.on('msg', (msg) => {
  //-- Añadirlo al párrafo display
  display.innerHTML += "<br> > " + msg;
});

//-- Botón de envío mensaje apretado
send.onclick = () => {
  //-- Se envía el mensaje escrito
  //-- Usamos el nombre 'msg' para los mensajes de usuario
  //-- Si no se ha introducido ningún mensaje, no se envía
  if (msg.value){
    if (msg.value[0] == '/'){
      socket.emit('cmd', msg.value);
    }else {
      socket.emit('msg', msg.value);
    }
  }
  //-- Borramos el mensaje escrito
  msg.value="";
}

//-- Botón de envío nombre
register.onclick = () => {
  if (name.value){
    socket.emit('name', name.value);
  }
}
