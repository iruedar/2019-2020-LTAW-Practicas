# Práctica 1

La practica 1 trata de construir un servidor web usando Node.js, que sirva las páginas de la web de una tienda. Los ficheros de la practica se encuentran en la carpeta P1/Tienda.

Es un servidor muy sencillo que se encarga de enviar imágenes situadas en la carpeta Tienda/img y ficheros html, js y json, y css situado en Tienda/css.

La tienda consta de 8 productos, en este caso es una tienda de zapatillas de futbol sala.

Para ejecutar el servidor web debemos estar en la carpeta P1/Tienda y ejecutar en el terminal node server.js o npm start. Después para acceder a la pagina de mi tienda hay que poner en el navegador: http://localhost:8080/ ya que el servidor está escuchando en el puerto 8080.

Cuando accedemos a la pagina el servidor recibe peticiones y las muestra en pantalla, index.html es la primera pagina solicitada, después el css, las imágenes y por último el favicon.

Cuando se pincha en cualquier imagen de un articulo nos lleva a otro html y el servidor vuelve a recibir las peticiones y las muestra por pantalla, solicitando primero el html del producto. Cuando estamos en la pagina de un producto si pinchamos en el enlace "Volver a la pagina principal" nos lleva al index otra vez.

Si se accede a un recurso que no existe, en este caso se ha elegido la imagen del carrito, genera una respuesta de error, 404 not found.

Todas las peticiones están registradas en el terminal
