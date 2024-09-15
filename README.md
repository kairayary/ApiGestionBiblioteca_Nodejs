# API de Gestión de Biblioteca

Este proyecto implementa una API de gestión de una biblioteca que permite realizar operaciones como agregar libros, autores, editoriales y realizar búsquedas, todo a través de un servidor TCP. Los usuarios pueden conectarse al servidor mediante un cliente y realizar consultas o acciones en la base de datos simulada de la biblioteca.

## Requisitos

Asegúrate de tener instalados los siguientes componentes antes de ejecutar el proyecto:

- [Node.js](https://nodejs.org/)
- NPM (se incluye con Node.js)

### Funcionalidad del servidor

El servidor acepta varios comandos para interactuar con la biblioteca:

-GET BOOKS: Obtiene la lista de todos los libros.
-ADD BOOK: Agrega un nuevo libro. Requiere los detalles del libro (título, autor, editorial y año).
-GET AUTHORS: Obtiene la lista de todos los autores.
-ADD AUTHOR: Agrega un nuevo autor. Requiere nombre y nacionalidad.
-FIND AUTHOR: Permite buscar autores por nombre o nacionalidad.
-GET PUBLISHERS: Obtiene la lista de todas las editoriales.
-ADD PUBLISHER: Agrega una nueva editorial. Requiere nombre y país.

#### Funcionalidad del cliente

El cliente permite al usuario elegir entre varios comandos, que se envían al servidor para su procesamiento.
Los comandos son:

-GET BOOKS: Muestra la lista de libros en la biblioteca.
-ADD BOOK: Permite agregar un libro, solicitando información como título, autor, editorial y año.
-GET AUTHORS: Muestra la lista de autores.
-ADD AUTHOR: Permite agregar un nuevo autor con nombre y nacionalidad.
-FIND AUTHOR: Busca autores por nombre o nacionalidad.
-GET PUBLISHERS: Muestra la lista de editoriales.
-ADD PUBLISHER: Permite agregar una nueva editorial, solicitando nombre y país.
-SALIR: Desconecta al cliente del servidor y finaliza el programa.

##### Flujo de trabajo

Elige una opción del menú.
Introduce los datos requeridos (en caso de ser necesario).
Recibe la respuesta del servidor.
El sistema te preguntará si deseas realizar otra operación o salir.

##### Ejecución
-Ejecutar el servidor TCP: Para iniciar el servidor, ejecuta el siguiente comando
node server.js

-Ejecutar el cliente: Para iniciar el cliente, abre otro terminal y ejecuta:
node client.js

###### Estructura del proyecto

 El proyecto sigue un patrón MVC (Modelo-Vista-Controlador)

├── client.js                  # Código del cliente que se conecta al servidor
├── server.js                  # Código del servidor TCP
├── controllers/
│   ├── booksController.js      # Controladores para manejar libros
│   ├── authorsController.js    # Controladores para manejar autores
│   └── publishersController.js # Controladores para manejar editoriales
├── models/
│   ├── books.json              # Archivo JSON con datos de libros
│   ├── authors.json            # Archivo JSON con datos de autores
│   └── publishers.json         # Archivo JSON con datos de editoriales
├── README.md                   # Este archivo README
├── package.json                # Información del proyecto y dependencias

Notas Adicionales:
Asegúrate de que el puerto 8080 esté libre en tu máquina.
Puedes modificar el puerto en los archivos server.js y client.js si es necesario.
Los datos se almacenan localmente en archivos JSON, lo que hace que este proyecto sea fácil de probar sin necesidad de una base de datos.
