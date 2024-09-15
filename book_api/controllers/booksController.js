//Importación de funciones del modelo de libros
const { readBooks, writeBook } = require('../models/bookModel');
const { v4: uuidv4 } = require('uuid');
const { formatResponse } = require('../views/allViews');

// Función para obtener todos los libros
function getAllBooksController() {
    //Llamamos la función readBooks del model, la cual devuelve un array con todos los libros
    const books = readBooks();

    // Si no hay libros disponibles
    if (books.length === 0) {
      
        return formatResponse({
            status: 'error',
            message: 'No hay libros disponibles',
        });
    }
  
    // Devuelve los libros disponibles en formato JSON
      return formatResponse({
        status: 'éxito',
        message: 'Libros obtenidos exitosamente',
        data: books,
    });
}

// Función para agregar un nuevo libro
function addBookController(bookData) {

    const { title, author, publisher, year } = bookData;

    // Valida que todos los campos obligatorios estén presentes
    if (!title || !author || !publisher || !year) {
        
        return formatResponse({
            status: 'error',
            message: 'Faltan campos obligatorios: título, autor, editorial o año',
        });
    }

    // Valida que el campo 'year' sea un número
    if (isNaN(year) || year.toString().length !== 4) {
       
        return formatResponse({
            status: 'error',
            message: 'El año debe ser un número válido de 4 dígitos',
        });
    }

    // Verifica si ya existe un libro con el mismo título y autor
    const books = readBooks();
    const bookExists = books.some(book => book.title === title && book.author === author);

    if (bookExists) {
        return formatResponse({ status: 'error', message: 'El libro ya existe en la biblioteca' });
    }

    // Agregar un ID único al libro
    const newBook = {
        id: uuidv4(),
        title,
        author,
        publisher,
        year
    };

    // Agrega el libro al archivo JSON utilizando la función writeBook() del modelo
    writeBook(newBook);

    return formatResponse({
        status: 'Éxito',
        message: 'Libro agregado exitosamente',
        data: newBook
    });
}

module.exports = { getAllBooksController, addBookController };