/* Obtener los kioscos existentes */
module.exports.getAllKioscos = function (req, res) {
    /* Obtener variable para la conexión a la BD */
    const con = require('../controllers/dbconn')();

    /* Ejecutar la consulta para consulta de kioscos */
    con.query('SELECT K.`idKiosco`, K.`nameKiosco`, K.`idShopUser`, S.nameUser FROM `kioscos` AS K INNER JOIN shopusers AS S ON K.idShopUser = S.idShopUser WHERE statusKiosco = 1', function (err, result, fields) {
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
                    kioscos: result,
                    message: 'Consulta de Kioscos'
                })
            } else {
                res.status(400).json({
                    Status: 'Failure',
                    message: 'No existen kioscos registrados'
                })
                con.end();
            }
        }
    });
}

/* Registrar un nuevo kiosco */
module.exports.insertKiosco = function (req, res) {
    /* Obtener variable para la conexión a la BD */
    const con = require('../controllers/dbconn').db_prom();

    /* Obtener los datos del Body */
    let data = req.body;
    

    /* Validar datos */
    let check = validationsKioscos(data.nameUser,data.passwordUser);
    
    if (check) {
        
        /* Establecer query para la insersión */
        let qry="INSERT INTO `shopusers` (`idShopUser`, `nameUser`, `passwordUser`, `statusUser`, `ecommerceYouPrint`) VALUES (NULL, ?, ?, '1', '1')"

        con.query(qry,[data.nameUser,data.passwordUser]).then( result => {
            if(result.affectedRows > 0){
                var idShopUser = result.insertId
                let qry="INSERT INTO `kioscos` (`idKiosco`, `nameKiosco`, `idShopUser`, `statusKiosco`) VALUES (NULL, ?, ?, '1')"
                return con.query(qry,[data.nameKiosco,idShopUser])
            }
        } , err =>{
            if (err.errno == 1062) {
                con.close();
                // Internal error message send
                res.status(409).json({
                    Status: 'Duplicated nameUser',
                    message: err
                });
            } else {
                con.close();
                // Internal error message send
                res.status(500).json({
                    Status: 'internal error',
                    message: err
                });
            }
        }).then(result =>{
            if(result.affectedRows > 0){
                res.status(200).json({
                    Status: 'Success',
                    msg: 'Se registró correctamente el kiosco'
                })
            }
        }, err => {
            
            if (err.errno == 1062) {
                con.close();
                // Internal error message send
                res.status(409).json({
                    Status: 'Duplicated nameUser',
                    message: err
                });
            } else {
                con.close();
                // Internal error message send
                res.status(500).json({
                    Status: 'internal error',
                    message: err
                });
            }
        }).catch(err => {
            res.status(500).json({
                status : 'failure',
                msg : 'Internal error2',
                ERR: err
            })
        })
    } else {
        res.status(406).json({
            Status: 'internal error',
            message: 'Datos no validos'
        });
    }
}

/* Actualizar datos de un kiosco */
module.exports.updateKiosco = function(req, res) {
     /* Obtener variable para la conexión a la BD */
    const con = require('../controllers/dbconn').db_prom();

    /* Obtener los datos del Body */
    let data = req.body;
    
    /* Ejecutar la consulta para eliminar kiosco */
    con.query('UPDATE kioscos SET nameKiosco=? WHERE idKiosco=?', [data.nameKiosco, data.idKiosco], function (err, result, fields) {
        if (err) {
            // Internal error message send
            res.status(500).json({
                Status: 'Internal Error',
                message: 'Internal Error'
            });
            con.end();
            return;
        } else {
            if (result.length == 1) {
                // Setup and send of response
                res.status(200).json({
                    Status: 'Success',
                    message: 'Se actualizo correctamente el kiosco'
                })
            } else {
                res.status(400).json({
                    Status: 'Failure',
                    message: 'No existen kioscos registrados'
                })
                con.end();
            }
        }
    });
}

/* Elimina kiosco (baja logica) */
module.exports.deleteKiosco = function (req, res) {
    /* Obtener variable para la conexión a la BD */
    const con = require('../controllers/dbconn')();

    /* Obtener los datos del Body */
    let data = req.body;
    console.log(data);

    /* Ejecutar la consulta para eliminar kiosco */
    con.query('UPDATE kioscos SET statusKiosco=0 WHERE idKiosco=?', [data.idKiosco], function (err, result, fields) {
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
                    message: 'Se elimino correctamente el kiosco'
                })
            }
        }
    });
}

function validationsKioscos(nameUser, passwordUser) {
    if (nameUser == '' || passwordUser == '') {
        return false
    }
    
    var patt = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!patt.test(nameUser)) {
        console.log(nameUser);
        
        return false
    }
    if (nameUser.length > 50) {
        return false
    }

    var pattPassword = /^(?=.*\d)(?=.*[!@#$&-.+,])(?=.*[A-Z])(?=.*[a-z])\S{8,45}$/
    if (!pattPassword.test(passwordUser)) {
        return false
    }
    return true
}
