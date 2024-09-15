const fs = require('fs');
const path = require('path');


//Ruta completa al archivo json de editores

const publishersPath = path.join(__dirname, '..', 'data', 'publishers.json');


//Para leer el archivo JSON de editores

function readPublishers() {

    //leer el archivo
    const publisherData = fs.readFileSync(publishersPath, 'utf8');
    
    //Si publisherData no es null, undefined, ni una cadena vacía, entonces se ejecuta JSON.parse(), y convierte la cadena JSON en array 
    return publisherData ? JSON.parse(publisherData) : [];

}



//Para escribir datos en el archivo de editores

function writePublisher(newPublisher) {

    //Para obtener la lista actual de editores
    const publishers = readPublishers();

    //agrega un nuevo editor al array de editores
    publishers.push(newPublisher);

    //convertir el array de objeto a JSON
    fs.writeFileSync(publishersPath, JSON.stringify(publishers, null, 2));

}

//Para testear
// const newPublisher = {

//      "id": "2",
//     "name": "Scribner"

// };

// addAuthor(newPublisher);


module.exports = { readPublishers, writePublisher };