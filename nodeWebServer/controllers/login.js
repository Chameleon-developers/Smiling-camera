/* Verificar datos de logIn */
module.exports.logIn = function (req, res) {
     /* Obtener variable para la conexión a la BD */
    var con = require('../controllers/dbconn')();

    var data = req.body;
    
    /* Establecer query para la consulta de logIn y saber si los datos son correctos */
    let qry = "SELECT MU.idManagerUser,MU.nameUser, T.idTypeUser, T.typeUser FROM managerusers AS MU INNER JOIN typeusers AS T ON MU.idTypeUser = T.idTypeUser WHERE MU.mainEmail = ? AND MU.passwordUser = ? AND MU.statusUser = 1 AND MU.ecommerceYouPrint = 1"

    /* Ejecutar la consulta para la validación de datos de LogIn */
    con.query(qry, [data.mainEmail, data.passwordUser], function (err, result, fields) {
        if (err) {
            // Internal error message send
            res.status(500).json({
                Status: 'internal error',
                message: 'Internal error'
            });
            con.end();
            return;
        } else {
            if (result.length == 1) {
                // Setup and send of response
                res.status(200).json({
                    Status: 'Success',
                    user: result,
                })
            } else {
                // In failed auth, error search
                con.query('SELECT mainEmail FROM managerusers WHERE mainEmail=? AND statusUser = 1 AND ecommerceYouPrint = 1', [data.mainEmail], function (err, result) {
                    if (err) {
                        // Internal error message send
                        res.status(500).json({
                            Status: 'internal error',
                            message: err,
                        });
                        con.end();
                        return;
                    } else {
                        if (result.length == 1) {
                            // Bad password
                            res.status(406).json({
                                Status: 'Failure',
                                message: 'Bad_Password'
                            })
                            con.end();
                            return;
                        } else {
                            // Bad username
                            res.status(401).json({
                                Status: 'Failure',
                                message: 'Bad_Credentials'
                            });
                            con.end();
                            return;
                        }
                    }
                })
            }
        }
    });
}