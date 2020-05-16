const http = require('http');
const url = require('url');
const fs = require('fs');
const PUERTO = 8080
let productos = ["Adidas Top Sala", "Joma Top Flex", "Kelme Precision Elite", "Mizuno Morelia", "Munich Continental", "New Balance Audazo", "Nike Lunar Gato", "Puma Future"];
let resultado = "";
let name = "";
let pwd = "";

console.log('Arrancando servidor...')

//-- Configurar el servidor
http.createServer( (req, res) => {
  console.log("---> Peticion recibida")
  console.log("Recurso solicitado (URL): " + req.url)
  var q = url.parse(req.url, true);
  console.log("pathname:" + q.pathname)

  //-- Leer las cookies
  const cookie = req.headers.cookie;
  console.log(cookie);

  // Leemos el index para URL vacía
  let mime = ""
  let file_name = ""
  if (q.pathname == "/"){
    file_name = "index.html"
  }else if (q.pathname == "/myquery") {
    //-- Leer los parámetros recibidos en la peticion
    const params = q.query;

    //-- No hacemos nada con ellos, simplemente los mostramos en
    //-- la consola
      console.log("Parametros: " + params.producto);

    let prod_similar = [];
    if (params.producto.length > 0) {
      for (var i = 0; i < productos.length; i++) {
        // -- Productos en minuscula e indexof --> si hay palabra parecida o no, si no hay =-1
        if (productos[i].toLowerCase().indexOf(params.producto.toLowerCase()) != -1) {
            prod_similar.push(productos[i]);
            resultado = productos[i];
        }
      }
    }
    //-- El array de productos lo pasamos a una cadena de texto,
    //-- en formato JSON:
    content = JSON.stringify(prod_similar) + '\n';
    //-- Generar el mensaje de respuesta
    //-- IMPORTANTE! Hay que indicar que se trata de un objeto JSON
    //-- en la cabecera Content-Type
    res.setHeader('Content-Type', 'application/json')
    res.write(content);
    res.end();
    return
  }else if (q.pathname == "/myform") {
    if (req.method === 'POST') {
      switch (resultado) {
        case "Adidas Top Sala":
          file_name = "adidas_topsala.html";
          break;
        case "Joma Top Flex":
          file_name = "joma_topflex.html";
          break;
        case "Kelme Precision Elite":
          file_name = "kelme_precisionelite.html";
          break;
        case "Mizuno Morelia":
          file_name = "mizuno_morelia.html";
          break;
        case "Munich Continental":
          file_name = "munich_continental.html";
          break;
        case "New Balance Audazo":
          file_name = "newbalance_audazo.html";
          break;
        case "Nike Lunar Gato":
          file_name = "nike_lunargato.html";
          break;
        case "Puma Future":
          file_name = "puma_future.html";
          break;
        default:
          file_name = "";
      }
      resultado = "";
    }
  }
  else if (q.pathname == "/register") {
    if (req.method === 'POST') {
      req.on('data', chunk => {
          //-- Leer los datos (convertir el buffer a cadena)
        data = chunk.toString();
        name = data.split("=")[1].split("&")[0];
        pwd = data.split("&")[1].split("=")[1];
        user_new = true;
        if (!cookie) {
          res.setHeader('Set-Cookie', name+"="+pwd + "/");
        }else {
          for (var i = 0; i < cookie.split("; ").length; i++) {
            if (cookie.split("; ")[i].split("=")[0] == name) {
              user_new = false;
              break;
            }
          }
          if (user_new) {
            res.setHeader('Set-Cookie', name+"="+pwd+ "/");
          }
        }
        //-- Mostrar los datos en la consola del servidor
        console.log("Datos recibidos: " + data)
        res.statusCode = 200;
        return
      });
      file_name = "index.html"
    }
  }else if (q.pathname == "/add_cart") {
    if (req.method === 'POST') {
      req.on('data', chunk => {
          //-- Leer los datos (convertir el buffer a cadena)
        data = chunk.toString();
        prod = data.split("=")[0];
        name = data.split("=")[1];
        console.log(data);
        user_new = true;
        if (!cookie) {
          file_name = "registro.html";
        }else {
          add_cart = "";
          for (var i = 0; i < cookie.split("; ").length; i++) {
            if (cookie.split("; ")[i].split("=")[0] == name) {
              user_new = false;
              add_cart = cookie.split("; ")[i].split("=")[1] += prod;
              res.setHeader('Set-Cookie', name+"="+add_cart+ ";");
              file_name = "index.html";
            }
          }
          if (user_new) {
            file_name = "registro.html";
          }
        }
        //-- Mostrar los datos en la consola del servidor
        console.log("Datos recibidos: " + data)
        res.statusCode = 200;
      });
      req.on('end', () => {
        fs.readFile(file_name, (err, data) => {
          res.writeHead(200, {'Content-Type': "text/html"});
          res.write(data);
          return res.end();
        })
      });
      return
    }
  }else{
    file_name = q.pathname.substr(1);
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
      break
    default:
      //
  };

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
