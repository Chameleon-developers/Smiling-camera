/* Verificar datos de logIn */
module.exports.logIn = function (req, res) {
    /* Obtener variable para encriptar el JWT */
    var crypto = require('crypto')
    /* Obtener variable para generar un token */
    var jwt = require('jsonwebtoken');
     /* Obtener variable para la conexión a la BD */
    var con = require('../controllers/dbconn')();

    /* Obtener los datos del Body */
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

                // Token generation for a successful auth
                const token = jwt.sign({
                    mainEmail: data.mainEmail,
                    idUser: result[0].idManagerUser,
                    type: result[0].typeUser,
                    idType: result[0].idTypeUser
                }, process.env.SEC_KEY, {
                        expiresIn: '24h',
                });
                var cipher = crypto.createCipher('aes128',process.env.SEC_AES_KEY)
                let encrypted = cipher.update( token , 'utf8' , 'hex')
                encrypted += cipher.final('hex')

                //Ruta después de LogIn
                route = 'panel.html'

                // Setup and send of response
                res.status(200).json({
                    Status: 'Success',
                    token: encrypted,
                    route: route
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