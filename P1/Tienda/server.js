const http = require('http');
const url = require('url');
const fs = require('fs');
const PUERTO = 8080


console.log('Arrancando servidor...')

//-- Configurar el servidor
http.createServer( (req, res) => {
  console.log("---> Peticion recibida")
  console.log("Recurso solicitado (URL): " + req.url)
  var q = url.parse(req.url, true);
  console.log("pathname:" + q.pathname)

  //_- Crear el mensaje de respuesta. Primero la cabecera
  //-- El código 200 se usa para indicar que todo está ok
  //-- En el campo Content-Type tenemos que introducir el tipo MIME
  //-- de lo que devolvemos
  let mime = ""
  let file_name = ""
  if (q.pathname == "/"){
    file_name = "index.html"
  }else{
    file_name = q.pathname.substr(1)
  }
  let extension = file_name.split(".")[1]

  switch (extension) {
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
      mime = "image/" + extension
      break;
    case "json":
    case "js":
      mime = "application/" + extension
      break;
    case "txt":
    case "css":
    case "html":
      mime = "text/" + extension
      break;
    case "webm":
    case "mpeg":
      mime = "video/" + extension
      break;
    case "mpeg":
    case "midi":
      mime = "audio/" + extension
      break;
    default:
      mime = "text/html"
  }

  fs.readFile(file_name, (err,data)  => {
      if (err) {
        res.writeHead(404, {'Content-Type': "text/html"});
        res.write("<h1>Error 404: File not found</h1>")
        return res.end()
      }
      else { //-- Lectura normal, cuando no hay errores
        res.writeHead(200, {'Content-Type': mime});
        res.write(data)
        return res.end()
      }
  });

}).listen(PUERTO);
console.log("Servidor corriendo...")
console.log("Puerto: " + PUERTO)
