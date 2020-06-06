# Práctica 2

La practica 2 trata de crear una tienda usando django. La versión que utilizaremos será la 2.2.10, que es la última estable (LTS), y funciona sobre python3. Los ficheros de la práctica se encuentran en la carpeta P2/proyecto_web.

Para ejecutar el servidor web debemos estar en la carpeta P2/proyecto_web en el terminal e introducir el comando python3 manage.py runserver. Después para acceder a la pagina web hay que introducir en el navegador la URL: http://localhost:8000/mi_tienda, ya que en Django el servidor escucha en el puerto 8000.
Para acceder al administrador de la base de datos se introduce en el navegador la URL: http://localhost:8000/admin/ con usuario: admin y contraseña: admin.

En la carpeta P2/proyecto_web/mi_tienda se encuentran las plantillas, las vistas, los modelos, las urls, los ficheros estáticos como las imágenes y el css, y admin donde están los los modelos definidos en modelos.py.

En la página principal tenemos index.html que es una extensión de base.html, ya que queremos que el header y el footer sean comunes en todas las páginas y así no repetir código, donde se encuentra la imagen de un carrito en la esquina superior izquierda que si se pincha en ella nos lleva a otra pagina donde podemos visualizar el carrito. En index.html tenemos un bucle for sobre el modelo Producto y nos muestra la imagen de todos los productos añadidos en la base de datos en el modelo producto, debajo pone el nombre del producto y si se pincha en la imagen nos manda a la página del producto, porque cogemos el path de la base de datos de ese producto.

La plantilla de cada producto se llama producto.html y es donde cogemos todos los parámetros del modelo Producto, donde primero ponemos el nombre y la imagen, debajo el stock disponible y el precio, y a su derecha la descripción del producto.
En esta página es donde podemos añadir el producto al carrito, para ello debemos introducir un nombre de usuario y se guarda en la base de datos del modelo Carrito, el cual se va a solicitar en carrito.html para poder visualizar el carrito. Abajo a la izaquierda tenemos un enlace a la página principal.

Si queremos ver los productos añadidos en el carrito debemos pinchar en la imagen del carrito la cual nos lleva a carrito.html en donde nos pide un nombre que debe coincidir con uno guardado en la base de datos del modelo Carrito, para facilitar el introducir un nombre guardado se muestran los nombres con pedidos guardados.

Si el stock de un producto es 0 cuando queramos añadirlo al carrito, saldrá una ventana emergente indicando que el producto esta agotado.
