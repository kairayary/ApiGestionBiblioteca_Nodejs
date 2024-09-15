
function formatResponse(data) {
    //Convertir los datos a una cadena JSON
     return JSON.stringify(data, null, 2)
}

module.exports ={ formatResponse};