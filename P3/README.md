# Práctica 3

La práctica 3 trata de crear un servidor web en node.js con interacción cliente-servidor, usando formularios, cookies y peticiones AJAX. Con ellos se implementan tres nuevas características al servidor web tienda de la práctica 1: Formulario de compra, carrito de la compra y búsqueda con autocompletado. Los ficheros de la práctica se encuentran en la carpeta P3.

Para ejecutar el servidor web debemos estar en la carpeta P3 en el terminal e introducir el comando node server.js o npm start. Después para acceder a la pagina web hay que introducir en el navegador la URL: http://localhost:8080, ya que en el servidor escucha en el puerto 8080.

En la pagina principal tenemos un buscador en la esquina superior izquierda para poder buscar los productos que funciona mediante AJAX, y en la esquina superior derecha tenemos la imagen de un carrito para acceder al carito de la compra y registrarse que es un hiperenlace a la pagina registro.html, y también tenemos las imágenes de los productos cada una con el hiperenlace a la página del producto.

En la página de registro te solicita el nombre de usuario y la contraseña que se guardan en cookies.

Cuando estamos en la pagina de un producto tenemos el nombre del producto y su imagen, la descripción y el precio, y un formuario  que es donde podemos añadir el producto al carrito donde te solicita el nombre de usuario, si se introduce un usuario no registrado te manda a la página de registro para registrarse y si estás registrado lo añade al carrito de ese usuario mediante cookies. También hay un hiperenlace a la página principal en la esquina inferior izquierda.

Para poder ver el carrito de la compra hay que pinchar en la imagen del carrito que solo esta en la página principal. En la página del carrito nos solicita nombre, apellidos correo y forma de pago, en la cual el nombre tiene que coincidir con el usuario cuando te registras, en caso de no estar registrado te manda a la página de registro, y si estás registrado pone los datos introducidos, los productos añadidos en el carrito y el precio total.
