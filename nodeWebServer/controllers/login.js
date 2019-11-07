/* Verificar datos de logIn */
module.exports.logIn = function (req, res) {
    /* Obtener variable para hacer petición del Captcha */
    var request = require('request')

    /* Obtener los datos del Body */
    var data = req.body
    var check = true

    /* Validar si el captcha existe */
    if (data.captcha === undefined || data.captcha === '' || data.captcha === null) {
        res.status(400).json({
            Status: 'Failure',
            message: 'Bad_Captcha'
        })
    } else {
        // Secret Key
        const secretKey = '6Ld-g7oUAAAAAJwuo_zduQp_3TaJhpLBzA5XAAlL'

        // Verify URL
        const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${data.captcha}&remoteip=${req.connection.remoteAddress}`

        // Make Request To VerifyURL
        request(verifyUrl, (err, response, body) => {
            body = JSON.parse(body)

            // If Not Successful
            if (body.success !== undefined && !body.success) {
                check = false
            }
        })

        if (check) {
            /* Obtener variable para encriptar el JWT */
            var crypto = require('crypto')
            /* Obtener variable para generar un token */
            var jwt = require('jsonwebtoken')
            /* Obtener variable para la conexión a la BD */
            var con = require('../controllers/dbconn')()

            /* Establecer query para la consulta de logIn y saber si los datos son correctos */
            let qry = "SELECT MU.idManagerUser,MU.nameUser, T.idTypeUser, T.typeUser FROM managerusers AS MU INNER JOIN typeusers AS T ON MU.idTypeUser = T.idTypeUser WHERE MU.mainEmail = ? AND MU.passwordUser = ? AND MU.statusUser = 1 AND MU.ecommerceYouPrint = 1"

            /* Ejecutar la consulta para la validación de datos de LogIn */
            con.query(qry, [data.mainEmail, data.passwordUser], function (err, result, fields) {
                if (err) {
                    // Internal error message send
                    res.status(500).json({
                        Status: 'internal error',
                        message: 'Internal error'
                    })
                    con.end()
                    return
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
                        })
                        var cipher = crypto.createCipher('aes128', process.env.SEC_AES_KEY)
                        let encrypted = cipher.update(token, 'utf8', 'hex')
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
                                })
                                con.end()
                                return
                            } else {
                                if (result.length == 1) {
                                    // Bad password
                                    res.status(406).json({
                                        Status: 'Failure',
                                        message: 'Bad_Password'
                                    })
                                    con.end()
                                    return
                                } else {
                                    // Bad username
                                    res.status(401).json({
                                        Status: 'Failure',
                                        message: 'Bad_Credentials'
                                    })
                                    con.end()
                                    return
                                }
                            }
                        })
                    }
                }
            })
        } else {
            res.status(400).json({
                Status: 'Failure',
                message: 'Bad_Captcha'
            })
        }
    }
}

module.exports.changePassword = function (req, res) {
    /* Obtener variable para hacer petición del Captcha */
    var request = require('request')
    var nodemailer = require('nodemailer');

    /* Obtener los datos del Body */
    var data = req.body
    var check = true

    if (data.captcha === undefined || data.captcha === '' || data.captcha === null) {
        res.status(400).json({
            Status: 'Failure',
            message: 'Bad_Captcha'
        })
    } else {
        // Secret Key
        const secretKey = '6Ld-g7oUAAAAAJwuo_zduQp_3TaJhpLBzA5XAAlL'

        // Verify URL
        const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${data.captcha}&remoteip=${req.connection.remoteAddress}`

        // Make Request To VerifyURL
        request(verifyUrl, (err, response, body) => {
            body = JSON.parse(body)

            // If Not Successful
            if (body.success !== undefined && !body.success) {
                check = false
            }
        })

        if (check) {
            var con = require('../controllers/dbconn')()

            /* Ejecutar la consulta para la validación de datos de LogIn */
            con.query('SELECT mainEmail FROM managerusers WHERE resetEmail=? AND statusUser = 1 AND ecommerceYouPrint = 1', [data.resetEmail], function (err, result, fields) {
                if (err) {
                    con.end()
                    // Internal error message send
                    res.status(500).json({
                        Status: 'internal error',
                        message: 'Internal error'
                    })
                } else {
                    if (result.length == 1) {
                        try {
                            var randomstring = Math.random().toString(36).slice(-8);

                            // Definimos el transporter
                            var transporter = nodemailer.createTransport({
                                service: 'Gmail',
                                auth: {
                                    user: 'chameleon.developers.send@gmail.com',
                                    pass: 'Develop4'
                                }
                            });
                            // Definimos el email
                            var mailOptions = {
                                from: 'chameleon.developers.send@gmail.com',
                                to: data.resetEmail,
                                subject: 'Recuperación de Contraseña YouPrint Administrador',
                                text: 'La contraseña para ingresar es: ' + randomstring
                            };
                            // Enviamos el email
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    con.end()
                                    res.status(500).json({
                                        Status: 'internal error',
                                        message: error
                                    })
                                } else {
                                    con.query("UPDATE `managerusers` SET `passwordUser` = ? WHERE resetEmail = ?", [randomstring, data.resetEmail], function (err, result, fields) {
                                        if (err) {
                                            con.end()
                                            // Internal error message send
                                            res.status(500).json({
                                                Status: 'internal error',
                                                message: 'Internal error ' + err
                                            })
                                        } else {
                                            //if (result.affectedRows == 1) {
                                                // Setup and send of response
                                                res.status(200).json({
                                                    Status: 'Success',
                                                    result: result
                                                })
                                            //}
                                        }
                                    })
                                }
                            });
                        } catch (error) {
                            con.end()
                            // Internal error message send
                            res.status(500).json({
                                Status: 'internal error',
                                message: 'Internal error Catch'
                            })
                        }
                    } else {
                        con.end()
                        res.status(401).json({
                            Status: 'Failure',
                            message: 'Bad_Credentials'
                        })
                    }
                }
            })
        } else {
            res.status(400).json({
                Status: 'Failure',
                message: 'Bad_Captcha'
            })
        }
    }
}