/* Obtener las dimensiones existentes */
module.exports.getDimensions = function (req, res) {
    /* Obtener variable para la conexión a la BD */
    const con = require('../controllers/dbconn')();

    /* Ejecutar la consulta para la obtención de dimensiones */
    con.query('SELECT idDimension, CONCAT(widthDimension, "X", heightDimension) AS dimensions FROM dimensions', function (err, result, fields) {
        if (err) {
            // Internal error message send
            res.status(500).json({
                Status: 'Internal Error',
                message: 'Internal Error'
            });
            con.end();
            return;
        } else {
            if (result.length > 0) {

                // Setup and send of response
                res.status(200).json({
                    Status: 'Success',
                    dimensions: result,
                    message: 'Datos de las dimensiones'
                })
            } else {
                res.status(400).json({
                    Status: 'Failure',
                    message: 'No existen dimensiones para e-commerce YouPrint'
                })
                con.end();
            }
        }
    });
}