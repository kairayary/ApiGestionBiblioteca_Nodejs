const { readPublishers, writePublisher } = require('../models/publisherModel');
const { v4: uuidv4 } = require('uuid');
const { formatResponse } = require('../views/allViews');

// Obtener todas las editoriales
function getAllPublishersController() {

    const publishers = readPublishers();

    if (publishers.length > 0) {

        return formatResponse({
            status: 'éxito',
            message: 'Editoriales obtenidas exitosamente',
            data: publishers
        });
    }

    return formatResponse({
        status: 'error',
        message: 'No hay editoriales disponibles'
    })

}

// Agregar una nueva editorial
function addPublisherController(publisherData) {
    const { name, country } = publisherData;

    // Validar que los campos requeridos estén presentes
    if (!name || !country) {

        return formatResponse({
            status: 'error',
            message: 'Faltan campos obligatorios: nombre y país',
        });

    }

    // Crear una nueva editorial con un ID único
    const newPublisher = { id: uuidv4(), name, country };
    
    writePublisher(newPublisher);
    return formatResponse({
        status: 'éxito',
        message: 'Editorial agregada exitosamente',
        data: newPublisher
    });
}

module.exports = { getAllPublishersController, addPublisherController };
