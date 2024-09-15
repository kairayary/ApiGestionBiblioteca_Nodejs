const fs = require('fs');
const path = require('path');


//Ruta completa al archivo json de autores

const authorsPath = path.join(__dirname, '..', 'data', 'authors.json');


//Para leer el archivo JSON de autores

function readAuthors() {

    //leer el archivo
    const authorData = fs.readFileSync(authorsPath, 'utf8');

    return authorData ? JSON.parse(authorData) : [];
}

//Para escribir datos en el archivo de autores

function writeAuthors(newAuthor) {

    //Para obtener la lista actual de autores
    const authors = readAuthors();

    //agrega un nuevo autor al array de autores
    authors.push(newAuthor);

    //convertir el array de objeto a JSON
    fs.writeFileSync(authorsPath, JSON.stringify(authors, null, 2));

}

// Para buscar autores por nombre o nacionalidad
function findAuthors(query) {
    const authors = readAuthors();
    //para recorrer todos los autores en el array authors
    
    return authors.filter(author => 
        //verifica si el nombre (author.name) o la nacionalidad (author.nationality) del autor contiene la query proporcionada
        author.name.toLowerCase().includes(query.toLowerCase()) || author.nationality.toLowerCase().includes(query.toLowerCase())
    );
}


module.exports = { readAuthors, writeAuthors, findAuthors };