const http = require('http');
const url = require('url');
const PUERTO = 8080

//-- Configurar el servidor
http.createServer( (req, res) => {
  console.log("---> Peticion recibida")
  console.log("Recurso solicitado (URL): " + req.url)

  //-- Analisis de la url recibida:
  let q = url.parse(req.url, true);

  console.log("Pathname: " + q.pathname)
  console.log("Search: " + q.search)
  console.log("Busqueda: ")
  let qdata = q.query
  console.log(qdata)

  //-- Acceso al objeto
  console.log("Articulo: " + qdata.articulo)
  console.log("Color: " + qdata.color)

}).listen(PUERTO);

console.log("Servidor corriendo...")
console.log("Puerto: " + PUERTO)
