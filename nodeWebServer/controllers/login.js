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
            con.query('SELECT resetEmail FROM managerusers WHERE mainEmail=? AND statusUser = 1 AND ecommerceYouPrint = 1', [data.mainEmail], function (err, result, fields) {
                if (err) {
                    con.end()
                    // Internal error message send
                    res.status(500).json({
                        Status: 'internal error',
                        message: 'Internal error'
                    })
                } else {
                    if (result.length == 1) {
                        var resetEmail = result[0].resetEmail;

                        try {
                            var randomstring = Math.random().toString(36).slice(-8);
                            randomstring += 'M9@.'

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
                                to: resetEmail,
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
                                    con.query("UPDATE `managerusers` SET `passwordUser` = ? WHERE mainEmail = ?", [randomstring, data.mainEmail], function (err, result, fields) {
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
                                                result: resetEmail
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

module.exports.changePasswordEcommerce = function (req, res) {
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
            con.query('SELECT resetEmail FROM shopusers WHERE nameUser=? AND statusUser = 1 AND ecommerceYouPrint = 1', [data.mainEmail], function (err, result, fields) {
                if (err) {
                    con.end()
                    // Internal error message send
                    res.status(500).json({
                        Status: 'internal error',
                        message: 'Internal error'
                    })
                } else {
                    if (result.length == 1) {
                        var resetEmail = result[0].resetEmail;

                        try {
                            var randomstring = Math.random().toString(36).slice(-8);
                            randomstring += 'M9@.'

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
                                to: resetEmail,
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
                                    con.query("UPDATE `shopusers` SET `passwordUser` = ? WHERE nameUser = ?", [randomstring, data.mainEmail], function (err, result, fields) {
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
                                                result: resetEmail
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

module.exports.logInEcommerce = function (req, res) {
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
            let qry = "SELECT `idShopUser`, `nameClient`, `apPaterno`, `apMaterno`, `resetEmail` FROM `shopusers` WHERE nameUser = ? AND passwordUser = ? AND ecommerceYouPrint = 1 AND statusUser = 1"

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
                            idUser: result[0].idShopUser,
                            resetEmail: result[0].resetEmail,
                        }, process.env.SEC_KEY, {
                            expiresIn: '24h',
                        })
                        var cipher = crypto.createCipher('aes128', process.env.SEC_AES_KEY)
                        let encrypted = cipher.update(token, 'utf8', 'hex')
                        encrypted += cipher.final('hex')

                        // Setup and send of response
                        res.status(200).json({
                            Status: 'Success',
                            token: encrypted,
                            idUser: result[0].idShopUser,
                        })
                    } else {
                        // In failed auth, error search
                        con.query('SELECT nameUser FROM shopusers WHERE nameUser=? AND statusUser = 1 AND ecommerceYouPrint = 1', [data.mainEmail], function (err, result) {
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

/* Registrar un nuevo usuario */
module.exports.registerUser = function (req, res) {
    /* Obtener variable para la conexión a la BD */
    var con = require('../controllers/dbconn')()

    /* Obtener variable para hacer petición del Captcha */
    var request = require('request')

    /* Obtener los datos del Body */
    var data = req.body
    var check2 = true

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
                check2 = false
            }
        })

        if (check2) {
            /* Validar datos */
            let check = validationsAddUser(data.mainEmail, data.resetEmail, data.nameUser, data.passwordUser)

            if (check) {

                /* Establecer query para la insersión */
                let qry = "INSERT INTO `shopusers` (`idShopUser`, `nameUser`, `passwordUser`, `tecnipunntos`, `nameClient`, `resetEmail`, `statusUser`, `ecommerceYouPrint`) VALUES (NULL, ?, ?, '0', ?, ?, '1', '1')"

                /* Ejecutar la consulta para la obtención de tipos de usuario */
                con.query(qry, [data.mainEmail, data.passwordUser, data.nameUser, data.resetEmail], function (err, result, fields) {
                    if (err) {
                        if (err.errno == 1062) {
                            // Internal error message send
                            res.status(409).json({
                                Status: 'Duplicated mainEmail',
                                message: err
                            })
                        } else {
                            // Internal error message send
                            res.status(500).json({
                                Status: 'internal error',
                                message: err
                            })
                        }
                        con.end()
                        return
                    } else {
                        if (result.affectedRows == 1) {
                            res.status(200).json({
                                Status: 'Success',
                                message: 'Se registró correctamente el usuario',
                            })
                        }
                    }
                })
            } else {
                res.status(406).json({
                    Status: 'internal error',
                    message: 'Datos no validos'
                })
            }
        }
    }




}

/* Función para validar que los datos de registro están correctos */
function validationsAddUser(mainEmail, resetEmail, nameUser, passwordUser) {
    if (mainEmail == '' || resetEmail == '' || nameUser == '' || passwordUser == '') {
        toast('Completa los campos de registro', 'is-warning')
        return false
    }

    var patt = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!patt.test(mainEmail)) {
        toast('El correo ingresado en "Correo" no es válido', 'is-warning')
        return false
    }
    if (mainEmail.length > 50) {
        toast('El correo ingresado en "Correo" no puede contener más de 50 caracteres', 'is-warning')
        return false
    }
    if (!patt.test(resetEmail)) {
        toast('El correo ingresado en "Correo para restablecer contraseña" no es válido', 'is-warning')
        return false
    }
    if (resetEmail.length > 50) {
        toast('El correo ingresado en "Correo para restablecer contraseña" no puede contener más de 50 caracteres', 'is-warning')
        return false
    }
    if (mainEmail == resetEmail) {
        toast('Los correos ingresados deben ser diferentes', 'is-warning')
        return false
    }

    var pattPassword = /^(?=.*\d)(?=.*[!@#$&-.+,])(?=.*[A-Z])(?=.*[a-z])\S{8,45}$/
    if (!pattPassword.test(passwordUser)) {
        toast('La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un carácter no alfanumérico ! @ # $ & - . + ,', 'is-warning')
        return false
    }

    return true
}