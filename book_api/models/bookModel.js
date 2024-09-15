
const fs = require('fs');
const path = require ('path');


//Ruta completa al archivo json de libros
const booksPath = path.join(__dirname,'..','data', 'books.json');


//Para leer el archivo JSON de libros
function readBooks() {

    //leer el archivo
    const bookData = fs.readFileSync(booksPath, 'utf8');
    
    //Si bookData no es null, undefined, ni una cadena vacía, entonces se ejecuta JSON.parse(bookData), y convierte la cadena JSON en un array 
    return bookData ? JSON.parse(bookData) :[];

}

//Para escribir datos en el archivo de libros
function writeBook(newBook) {

    //Para obtener la lista actual de libros
     const books = readBooks();

    //agrega un nuevo libro al array de libros
     books.push(newBook);

    //convertir el array de objeto a JSON
    fs.writeFileSync(booksPath, JSON.stringify(books, null, 2));
    
}

module.exports = {readBooks, writeBook };