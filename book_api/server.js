
const net = require('net');
const { getAllBooksController, addBookController } = require('./controllers/booksController');
const { getAllAuthorsController, addAuthorController, findAuthorsController } = require('./controllers/authorsController');
const { getAllPublishersController, addPublisherController } = require('./controllers/publishersController');


const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    const input = data.toString().trim();

    // Procesar cada comando, separando por saltos de línea
    const commands = input.split('\n');

    commands.forEach((command) => {
      //---COMANDOS PARA LIBROS----
      if (command === 'GET BOOKS') {
        // Uso del controlador para obtener los libros
        const response = getAllBooksController();

        socket.write(response + '\n');

      } else if (command.startsWith('ADD BOOK')) {
        // Parsear los datos del libro desde el comando
        const bookData = JSON.parse(command.slice(8).trim());

        // Uso del controlador para agregar el libro
        const response = addBookController(bookData);
        socket.write(response + '\n');


        // ----COMANDOS PARA AUTORES----
      } else if (command === 'GET AUTHORS') {

        // Uso del controlador para agregar el autor
        const response = getAllAuthorsController();
        socket.write(response + '\n');

      } else if (command.startsWith('ADD AUTHOR')) {
        const authorData = JSON.parse(command.slice(10).trim());
        const response = addAuthorController(authorData);
        socket.write(response + '\n');

      } else if (command.startsWith('FIND AUTHOR')) {
        const query = command.slice(11).trim();
        // Uso del controlador para buscar el autor
        const response = findAuthorsController(query);
        socket.write(response + '\n');

        //----COMANDO PARA EDITORIALES----
      } else if (command === 'GET PUBLISHERS') {
        // Uso del controlador para obtener el editor
        const response = getAllPublishersController();
        socket.write(response + '\n');

      } else if (command.startsWith('ADD PUBLISHER')) {
        const publisherData = JSON.parse(command.slice(13).trim());
        // Uso del controlador para agregar el autor
        const response = addPublisherController(publisherData);
        socket.write(response + '\n');

      } else {
        //----COMANDO DESCONOCIDO----
        socket.write(JSON.stringify({ status: 'error', message: 'Comando desconocido' }));
      }
    });

    //Manejo del error del socket
    socket.on('error', (err) => {
      console.error('Socket error: ', err);
    });
  });

 //Manejo de la desconexión
  socket.on('close', () => {
    console.log('Desconectado del servidor');

  });
});





server.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
});
