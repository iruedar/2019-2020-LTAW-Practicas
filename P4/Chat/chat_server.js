//-- Cargar las dependencias
//-- Modulo express
const express = require('express')
//-- Crear una nueva aplciacion web
const app = express()
//-- Crear un servidor. Los mensajes recibidos
//-- los gestiona la app
const http = require('http').Server(app);
//-- Biblioteca socket.io en el lado del servidor
const io = require('socket.io')(http);
//-- Puerto donde lanzar el servidor
const PORT = 8080
var clients = 0;
var users = {};

//-- Lanzar servidor
http.listen(PORT, function(){
  console.log('Servidor lanzado en puerto ' + PORT);
});

//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Página principal
app.get('/', (req, res) => {
  let path = __dirname + '/chat.html';
  res.sendFile(path);
  console.log("Acceso a " + path);
});

//-- El resto de peticiones se interpretan como
//-- ficheros estáticos
app.use('/', express.static(__dirname +'/'));

//------ COMUNICACION POR WEBSOCKETS
//-- Evento: Nueva conexion recibida
//-- Un nuevo cliente se ha conectado!
io.on('connection', function(socket){

  //-- Función de retrollamada de mensaje recibido del cliente
  socket.on('msg', (msg) => {
    console.log("Cliente: " + socket.id + ': ' + msg);
    //-- Enviar el mensaje a TODOS los clientes que estén conectados
    io.emit('msg', users[socket.id] + ": " + msg);
  });

  // -- Gestión comandos
  socket.on('cmd', (msg) => {
    console.log("Cliente: " + socket.id + ': ' + msg);
    let mess = "";
    if (msg == "/help") {
      mess += "/help = Mostrar comandos; /list = Número de usuarios conectados; "
      mess += "/hello = Servidor envía un saludo; /date = Fecha actual"
    }else if (msg == "/list") {
      mess += "Número de usuarios conectados = " + clients.toString();
    }else if (msg == "/hello") {
      mess += "SERVER: Hola " + users[socket.id];
    }else if (msg == "/date") {
      mess += new Date();
    }else {
      mess += "Comando incorrecto, /help para más información"
    }
    socket.emit('msg', mess);
    console.log("Cliente: " + socket.id + ': ' + msg);
  });

  // -- Registro cliente
  socket.on('name', (msg) => {
    clients += 1;
    users[socket.id] =  msg;
    io.emit('msg', 'SERVIDOR: ' + users[socket.id] + ' se ha conectado al chat');
    //-- Usuario conectado. Imprimir el identificador de su socket
    console.log('Nuevo usuario conectado!. Socket id: ' + socket.id);
    //-- Le damos la bienvenida a través del evento 'hello'
    //-- ESte evento lo hemos creado nosotros para nuestro chat
    socket.emit('hello', "Bienvenido al Chat, eres el usuario número " + clients.toString());
    //-- Usuario desconectado. Imprimir el identificador de su socket
  })

  // -- Cliente desconectado
  socket.on('disconnect', function(){
    clients -= 1;
    io.emit('msg', 'SERVIDOR: ' + users[socket.id] + ' ha abandonado el chat');
    console.log('--> Usuario Desconectado. Socket id: ' + socket.id);
  });
});
