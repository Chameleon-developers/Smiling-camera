/* Registrar o actualizar datos de usuario ecommerce */
module.exports.updateShopUser = function (req, res) {
    /* Obtener variable para la conexión a la BD */
    const con = require('../controllers/dbconn')()

    /* Obtener los datos del Body */
    let data = req.body
    
    /* Establecer query para la consulta para insertar */
    let qry
    if(data.passwordUser) {
        qry = "INSERT INTO shopusers(idShopUser, resetEmail, passwordUser, nameClient, apPaterno, apMaterno) VALUES(?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE resetEmail=?, passwordUser=?, nameClient=?, apPaterno=?, apMaterno=?"
        values = [data.idUser, data.resetEmail, data.passwordUser, data.nameClient, data.apPaterno, data.apMaterno, data.resetEmail, data.passwordUser, data.nameClient, data.apPaterno, data.apMaterno]
    }
    else {
        qry = "INSERT INTO shopusers(idShopUser, resetEmail, nameClient, apPaterno, apMaterno) VALUES(?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE resetEmail=?, nameClient=?, apPaterno=?, apMaterno=?"
        values = [data.idUser, data.resetEmail, data.nameClient, data.apPaterno, data.apMaterno, data.resetEmail, data.nameClient, data.apPaterno, data.apMaterno]
    }

    /* Ejecutar la consulta para la actualizacion de datos de usuario ecommerce */
    con.query(qry,values,function (err, result, fields) {
        if (err) {
            // Internal error message send
            res.status(500).json({
                Status: 'internal error',
                message: err
            })
            con.end()
            return
        } 
        else {
            if (result.affectedRows == 1) {
                res.status(200).json({
                    Status: 'Success',
                    message: 'Se actualizaron correctamente los datos'
                })
            }
        }
    })    
}

/* Obtener datos de uduario ecommerce */
module.exports.getShopUser = function (req, res) {
    /* Obtener variable para la conexión a la BD */
    const con = require('../controllers/dbconn')()

    /* Obtener los datos del Body */
    let data = req.body

    /* Ejecutar la consulta para consulta datos de usuario ecommerce*/
    con.query('SELECT nameUser, resetEmail, nameClient, apPaterno, apMaterno FROM shopusers WHERE idShopUser=?', [data.idUser], function (err, result, fields) {
        if (err) {
            // Internal error message send
            res.status(500).json({
                Status: 'Internal Error',
                message: 'Internal Error'
            })
            con.end()
            return
        } else {
            if (result.length > 0) {
                // Setup and send of response
                res.status(200).json({
                    Status: 'Success',
                    usuario: result,
                    message: 'Consulta de datos de usuario'
                })
            } else {
                res.status(400).json({
                    Status: 'Failure',
                    message: 'No existen el usuario'
                })
                con.end()
            }
        }
    })
}