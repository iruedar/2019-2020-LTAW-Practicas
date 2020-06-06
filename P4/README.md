# Práctica 4

La práctica 4 trata de realizar un chat en el que múltiples usuarios puedan hablar entre sí a partir de un servidor hecho con nodejs. Para poder tener una comunicación Cliente-Servidor bidireccional utilizaremos express y websockets. Los ficheros de la práctica se encuentran en la carpeta P4/Chat.

Para ejecutar el servidor web debemos estar en la carpeta P4/Chat en el terminal e introducir el comando node chat_server.js o npm start. Después para acceder a la pagina web hay que introducir en el navegador la URL: http://localhost:8080, ya que en el servidor escucha en el puerto 8080.

Al entrar en la página sale una ventana emergente donde tenemos que introducir el nombre, una vez enviado ya estamos en el chat y cada vez que un usuario se conecte el servidor le enviará un mensaje de Bienvenida y el numero de usuario que eres, es decir, cuantos usuarios hay conectados, y anunciará al resto de participantes que se ha conectado alguien nuevo indicando el nombre de usuario.

Para enviar los mensajes hay que darle al boton "SEND" y el mensaje se enviará a todos los usuarios conectados y así mismo con la forma (user: mensaje), y si en vez de un mensaje queremos hacerle peticiones al servidor debemos poner /"comando" teniendo como comandos aceptados: /help: Mostrará una lista con todos los comandos soportados, /list: Devolverá el número de usuarios conectados, /hello: El servidor nos devolverá el saludo, /date: Nos devolverá la fecha.
Si el comando introducido no es aceptado el servidor responde con: "Comando incorrecto, /help para más información".
El servidor sólo envía la información de estos comandos al usuario que se la ha pedido.

Hay cinco eventos distintos:
  - name: mensaje que envía el cliente al servidor con el nombre de usuario.
  - hello: mensaje que envía el servidor como respuesta al mensaje name, dando la bienvenida e indicando que número de usuario eres.
  - msg: mensaje que envia el usuario al resto de clientes
  - cmd: mensaje para el uso de los comandos, pero este no se envía al resto de clientes.
  - disconnect: mensaje que envía el cliente al servidor cuando se desconecta y el servidor envía un msg a todos los clientes indicando que el usuario ha abandonado el chat.
