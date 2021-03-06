const ver = document.getElementById('ver')
const resultado = document.getElementById('resultado');


ver.onkeyup = ()=>{

  if (ver.value.length >= 3) {
    //-- Crear objeto para hacer peticiones AJAX
    const m = new XMLHttpRequest();

    //-- Configurar la petición
    m.open("GET","http://localhost:8080/myquery?producto="+ ver.value, true);

    //-- Cuando la haya alguna noticia sobre la peticion
    //-- ejecuta este código
    m.onreadystatechange=function(){
       //-- Petición enviada y recibida. Todo OK!
       if (m.readyState==4 && m.status==200){
         //-- La respuesta es un objeto JSON
         let productos = JSON.parse(m.responseText)
         //-- Borrar el resultado anterior que hubiese en el párrafo
         //-- de resultado
         resultado.innerHTML = "";
         //--Recorrer los productos del objeto JSON
         for (let i=0; i < productos.length; i++) {
           //-- Añadir cada producto al párrafo de visualización
           resultado.innerHTML += productos[i];
           //-- Separamos los productos por ',''
           if (i < productos.length-1) {
             resultado.innerHTML += ', ';
           }
         }
       }
     }
     //-- Enviar la petición!
     m.send();
  }else {
    resultado.innerHTML = "";
  }
}
