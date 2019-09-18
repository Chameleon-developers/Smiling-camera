/* Obtener Los tipos de usuario existentes */
module.exports.getTypeUsers = function (req, res) {
    /* Obtener variable para la conexión a la BD */
    const con = require('../controllers/dbconn')();

    /* Ejecutar la consulta para la obtención de tipos de usuario */
    con.query('SELECT idTypeUser,typeUser FROM typeusers WHERE ecommerceYouPrint = 1', function (err, result, fields) {
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
                    typeUsers: result,
                    message: 'Datos de los tipos de usuario'
                })
            } else {
                res.status(400).json({
                    Status: 'Failure',
                    message: 'No existen tipos de usuarios para e-commerce YouPrint'
                })
                con.end();
            }
        }
    });
}

/* Registrar un nuevo usuario */
module.exports.insertUser = function (req, res) {
    /* Obtener variable para la conexión a la BD */
    const con = require('../controllers/dbconn')();

    /* Obtener los datos del Body */
    let data = req.body;

    /* Establecer query para la insersión */
    let qry="INSERT INTO managerusers (idManagerUser, mainEmail, resetEmail, nameUser, passwordUser, idTypeUser, statusUser, ecommerceYouPrint) VALUES (NULL, ?, ?, ?, ?, ?, '1', '1')"

    /* Ejecutar la consulta para la obtención de tipos de usuario */
    con.query(qry,[data.mainEmail,data.resetEmail,data.nameUser,data.passwordUser,data.idTypeUser],function (err, result, fields) {
        if (err) {
            // Internal error message send
            res.status(500).json({
                Status: 'internal error',
                message: 'Internal error'
            });
            con.end();
            return;
        } else {
            if (result.affectedRows == 1) {
                console.log(result);
                
                res.status(200).json({
                    Status: 'Success',
                    message: 'Se registró correctamente el usuario'
                })
            }
        }
    })
}