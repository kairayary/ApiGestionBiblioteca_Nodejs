const { readAuthors, writeAuthors, findAuthors } = require('../models/authorModel');
const { v4: uuidv4 } = require('uuid');
const { formatResponse } = require('../views/allViews');


// Obtener todos los autores
function getAllAuthorsController() {
    const authors = readAuthors();

    if(authors.length > 0 ){
        return formatResponse({
            status: 'éxito',
            message: 'Autores obtenidos exitosamente',
            data: authors
        });
    }

    return formatResponse({
        status: 'error',
        message: 'No hay autores disponibles'
    })
}   

// Agregar un nuevo autor
function addAuthorController(authorData) {
    const { name, nationality } = authorData;
    
    // Validar que los campos requeridos estén presentes
    if (!name || !nationality) {
        return formatResponse({
            status: 'error',
            message: 'Faltan campos obligatorios: nombre y nacionalidad',
        });
        
    }

    // Crear un nuevo autor con un ID único
    const newAuthor = { id: uuidv4(), name, nationality };
    writeAuthors(newAuthor);
    return formatResponse({
        status: 'Éxito',
        message: 'Autor agregado exitosamente',
        data: newAuthor
    });
    
}

// Buscar autores por nombre o nacionalidad
function findAuthorsController(query) {
    const authors = findAuthors(query);

    if(authors.length > 0 ){
        return formatResponse({
            status: 'éxito',
            message: 'Autores encontrados',
            data: authors
        });
    }

    return formatResponse({
        status: 'error',
        message: 'No se encontraron autores con ese criterio'
    })
    
}

module.exports = { getAllAuthorsController, addAuthorController, findAuthorsController };
