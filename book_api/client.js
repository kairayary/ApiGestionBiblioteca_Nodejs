const net = require('net');
const readline = require('readline');

// Interfaz para leer la entrada del usuario
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para mostrar el menú de opciones
function menuOptions() {
  console.log('\nElije un comando: ');
  console.log('1. GET BOOKS');
  console.log('2. ADD BOOK');
  console.log('3. GET AUTHORS');
  console.log('4. ADD AUTHOR');
  console.log('5. FIND AUTHOR');
  console.log('6. GET PUBLISHERS');
  console.log('7. ADD PUBLISHER');
  console.log('8. SALIR');
  rl.question('Su elección es: ', handleClientRequest);
}

// Conexión con el servidor TCP
const client = net.createConnection({ port: 8080 }, () => {
  console.log('Conectado al servidor exitosamente!!');
  console.log('---BIENVENIDOS A LA API DE GESTIÓN DE BIBLIOTECA---');
  menuOptions();
});

// Función para manejar las solicitudes del cliente
function handleClientRequest(command) {
  command = command.trim().toUpperCase();
  if (command === '1' || command === 'GET BOOKS') {
    // Enviar el comando GET BOOKS al servidor
    client.write('GET BOOKS');

  } else if (command === '2' || command === 'ADD BOOK') {
    // Recoger los detalles del nuevo libro
    rl.question('Ingresa el título del libro: ', (title) => {
      rl.question('Ingresa el autor del libro: ', (author) => {
        rl.question('Ingresa la editorial del libro: ', (publisher) => {
          rl.question('Ingresa el año de publicación: ', (year) => {
            // Crear el objeto libro
            const newBook = {
              title: title,
              author: author,
              publisher: publisher,
              year: parseInt(year)
            };

            // Enviar el comando ADD BOOK y los datos del libro al servidor
            client.write(`ADD BOOK ${JSON.stringify(newBook)}`);
          });
        });
      });
    });
  } else if (command === '3' || command === 'GET AUTHORS') {
    // Enviar el comando ADD AUTHOR  al servidor
    client.write('GET AUTHORS');

  } else if (command === '4' || command === 'ADD AUTHOR') {
    rl.question('Nombre del autor: ', (name) => {
      rl.question('Nacionalidad del autor: ', (nationality) => {

        //Crea el objeto autor
        const newAuthor = { name, nationality };
        // Enviar el comando ADD AUTHOR  al servidor
        client.write(`ADD AUTHOR ${JSON.stringify(newAuthor)}`);
      });
    });

  } else if (command === '5' || command === 'FIND AUTHOR') {
    rl.question('Elija buscar por nombre o nacionalidad: ', (query) => {

      // Enviar el comando FIND AUTHOR  al servidor
      client.write(`FIND AUTHOR ${query}`);
    });

  } else if (command === '6' || command === 'GET PUBLISHERS') {

    // Enviar el comando GET PUBLISHERS  al servidor
    client.write('GET PUBLISHERS');

  } else if (command === '7' || command === 'ADD PUBLISHER') {
    rl.question('Nombre de la editorial: ', (name) => {
      rl.question('País de la editorial: ', (country) => {
        //Crea el objeto editor
        const newPublisher = { name, country };

        // Enviar el comando ADD PUBLISHER  al servidor
        client.write(`ADD PUBLISHER ${JSON.stringify(newPublisher)}`);
      });
    });
  } else if (command === '8' || command === 'SALIR') {
    console.log('Saliendo...');
    client.end();
    rl.close();
  } else {
    console.log('Comando no reconocido');
    menuOptions();
  }
}


// Recibir respuesta del servidor
client.on('data', (data) => {
  console.log('Respuesta del servidor:');
  console.log(data.toString());

  // Preguntar si desea realizar otra operación
  rl.question('\n¿Deseas realizar otra operación? (si/no): ', (answer) => {
    if (answer.trim().toLowerCase() === 'si') {
      menuOptions();
    } else {
      console.log('Gracias por usar nuestro servicio. Adiós lo esperamos de nuevo!!!.');
      client.end();
      rl.close();
    }

  });
});

// Manejar la desconexión
client.on('close', () => {
  console.log('Desconectado del servidor');

});
