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
    

    /* Validar datos */
    let check = validationsAddUser(data.mainEmail,data.resetEmail,data.nameUser,data.passwordUser,data.idTypeUser);
    
    if (check) {
        let typeUser = parseInt(data.idTypeUser)
        
        /* Establecer query para la insersión */
        let qry="INSERT INTO managerusers (idManagerUser, mainEmail, resetEmail, nameUser, passwordUser, idTypeUser, statusUser, ecommerceYouPrint) VALUES (NULL, ?, ?, ?, ?, ?, '1', '1')"

        /* Ejecutar la consulta para la obtención de tipos de usuario */
        con.query(qry,[data.mainEmail,data.resetEmail,data.nameUser,data.passwordUser,typeUser],function (err, result, fields) {
            if (err) {
                if (err.errno == 1062) {
                    // Internal error message send
                    res.status(409).json({
                        Status: 'Duplicated mainEmail',
                        message: err
                    });
                } else {
                    // Internal error message send
                    res.status(500).json({
                        Status: 'internal error',
                        message: err
                    });
                }
                con.end();
                return;
            } else {
                if (result.affectedRows == 1) {
                    res.status(200).json({
                        Status: 'Success',
                        message: 'Se registró correctamente el usuario'
                    })
                }
            }
        })
    } else {
        res.status(406).json({
            Status: 'internal error',
            message: 'Datos no validos'
        });
    }

    
}

function validationsAddUser(mainEmail, resetEmail, nameUser, passwordUser, typeUser) {
    if (mainEmail == '' || resetEmail == '' || nameUser == '' || passwordUser == '') {
        return false
    }
    if (parseInt(typeUser) == 0) {
        return false
    }
    
    var pattMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!pattMail.test(mainEmail) && mainEmail.lenght < 50) {
        return false
    }
    if (!pattMail.test(resetEmail) && resetEmail.lenght < 50) {
        return false
    }
    if (mainEmail == resetEmail) {
        return false
    }

    var pattPassword = /^(?=.*\d)(?=.*[!@#$&-.+,])(?=.*[A-Z])(?=.*[a-z])\S{8,45}$/
    if (!pattPassword.test(passwordUser)) {
        return false
    }
    return true
}

/* Registrar un nuevo usuario */
module.exports.updateUser = function (req, res) {
    /* Obtener variable para la conexión a la BD */
    const con = require('../controllers/dbconn')();

    /* Obtener los datos del Body */
    let data = req.body;

     /* Establecer query para la modificación */
     let qry = ""
     if (data.passwordUser){
        qry="UPDATE managerusers SET mainEmail = ?, resetEmail = ?, nameUser = ?, passwordUser = ?, idTypeUser = ? WHERE idManagerUser = ? "
        values=[data.mainEmail,data.resetEmail,data.nameUser,data.passwordUser,data.idTypeUser,data.idManagerUser];
     } else{
        qry="UPDATE managerusers SET mainEmail = ?, resetEmail = ?, nameUser = ?, idTypeUser = ? WHERE idManagerUser = ? "
        values=[data.mainEmail,data.resetEmail,data.nameUser,data.idTypeUser,data.idManagerUser];
     }

     /* Ejecutar la consulta para la obtención de tipos de usuario */
    con.query(qry,values,function (err, result, fields) {
        if (err) {
            // Internal error message send
            res.status(500).json({
                Status: 'internal error',
                message: err
                //message: 'Internal error'
            });
            con.end();
            return;
        } else {
            if (result.affectedRows == 1) {
                res.status(200).json({
                    Status: 'Success',
                    message: 'Se modificó correctamente el usuario'
                })
            }
        }
    })
}

/* Obtener usuarios registrados */
module.exports.getUsers = function (req, res) {
    /* Obtener variable para la conexión a la BD */
    const con = require('../controllers/dbconn')();

    /* Establecer query para la obtencion de usuarios */
    let qry = "SELECT idManagerUser, mainEmail, resetEmail, nameUser, idTypeUser FROM managerusers WHERE statusUser=1 AND ecommerceYouPrint=1";

    /* Ejecutar la consulta para la obtención de tipos de usuario */
    con.query(qry, function (err, result, fields) {
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
                    users: result,
                    message: 'Datos de los usuarios'
                })
            } else {
                res.status(400).json({
                    Status: 'Failure',
                    message: 'No existen usuarios para e-commerce YouPrint'
                })
                con.end();
            }
        }
    });
}

/* Obtener usuarios registrados */
module.exports.getUser = function (req, res) {
    /* Obtener variable para la conexión a la BD */
    const con = require('../controllers/dbconn')();

    /* Obtener los datos del Body */
    let data = req.body;

    /* Establecer query para la obtencion de usuarios */
    let qry = "SELECT mainEmail, resetEmail, nameUser, idTypeUser, passwordUser FROM managerusers WHERE statusUser=1 AND ecommerceYouPrint=1 AND idManagerUser=?";

    /* Obtiene los valores para la consulta */
    let values = [data.idManagerUser];

    /* Ejecutar la consulta para la obtención de tipos de usuario */
    con.query(qry, values, function (err, result, fields) {
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
                    users: result,
                    message: 'Datos de los usuario'
                })
            } else {
                res.status(400).json({
                    Status: 'Failure',
                    message: 'No existen usuarios para e-commerce YouPrint'
                })
                con.end();
            }
        }
    });
}

/* Eliminar usuarios registrados */
module.exports.deleteUser = function(req, res) {
    /* Obtener variable para la conexión a la BD */
    const con = require('../controllers/dbconn')();

    /* Obtener los datos del Body */
    let data = req.body;

    /* Establecer query para la insersión */
    let qry = "UPDATE managerusers SET statusUser=0 WHERE idManagerUser=?";

    /* Obtiene los valores para la consulta */
    let values = [data.idManagerUser];

    /* Ejecutar la consulta para la eliminación de usuario */
    con.query(qry,values,function (err, result, fields) {
        if (err) {
            // Internal error message send
            res.status(500).json({
                Status: 'internal error',
                message: err
                //message: 'Internal error'
            });
            con.end();
            return;
        } else {
            if (result.affectedRows == 1) {
                res.status(200).json({
                    Status: 'Success',
                    message: 'Se elimino correctamente el usuario'
                })
            }
        }
    });
}
