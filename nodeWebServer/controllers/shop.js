/* Registrar un Producto en carrito */
module.exports.addShop = function (req, res) {
    /* Obtener variable para la conexión a la BD */
    const con = require('../controllers/dbconn')()

    /* Obtener los datos del Body */
    let data = req.body
    
    /* Establecer query para la consulta para insertar */
    let qry="INSERT INTO shop(quantityShop, zipNameShop, idUser, idSubcategory) VALUES(1, ?, ?, ?)"
    if(req.file) {
        values = [req.file.filename, res.decode.idUser, data.idSubcategory] //res.decode.idUser
    }
    else {
        res.status(400).json({
            Status: 'Failure',
            message: 'No se subió ninguna imagen'
        })
    }

    /* Ejecutar la consulta para la obtención del último id insertado en carrito */
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
                    message: 'Se registró correctamente el producto'
                })
            }
        }
    })    
}

/* Obtener carrito de un usuario */
module.exports.getShop = function (req, res) {
    /* Obtener variable para la conexión a la BD */
    const con = require('../controllers/dbconn')()

    /* Establecer query para la consulta para insertar */
    let qry = 'SELECT idShop, quantityShop, zipNameShop, idProductYouPrint, PROYP.nameProduct, publicPrice FROM shop AS S INNER JOIN productsyouprint AS PROYP ON S.idProductYouPrint=PROYP.idProduct INNER JOIN productsprice AS PP ON S.idProductYouPrint=PP.idProduct WHERE idUser=?'

    /* Ejecutar la consulta para la obtención de tipos de productos */
    con.query(qry, res.decode.idUser, function (err, result, fields) {
        if (err) {
            // Internal error message send
            res.status(500).json({
                Status: 'Internal Error',
                message: 'Internal Error'
            })
            con.end()
            return
        } else {
            // Setup and send of response
            res.status(200).json({
                Status: 'Success',
                shop: result,
                message: 'Productos del carrito'
            })
        }
    })
}

module.exports.addDefaultShop = function (req, res) {
    /* Obtener variable para la conexión a la BD */
    const con = require('../controllers/dbconn').db_prom()

    /* Obtener los datos del Body */
    let data = req.body

    /* Establecer query para la consultar si no se encuentra ya el producto */
    let qry="SELECT idShop, quantityShop FROM shop WHERE idUser = ? AND idProductYouPrint = ?"

    con.query(qry,[res.decode.idUser, data.idProduct]).then( result => {
        let qry2 = ""
        if(result.length == 1){
            let cantidad = parseInt(result[0].quantityShop) + parseInt(data.quantityShop)
            qry2 = "UPDATE shop SET quantityShop = ? WHERE `idShop` = ?"
            values = [cantidad, result[0].idShop]
        } else {
            qry2 = "INSERT INTO shop (quantityShop, idUser, idProductYouPrint) VALUES(?, ?, ?)"
            values = [data.quantityShop, res.decode.idUser, data.idProduct]
        }
        return con.query(qry2, values)
    } , err =>{
        con.close()
        // Internal error message send
        res.status(500).json({
            Status: 'internal error',
            message: err
        })
    }).then(result =>{
        if(result.affectedRows > 0){
            res.status(200).json({
                Status: 'Success',
                msg: 'Se registró correctamente el kiosco'
            })
        }
    }, err => {
        con.close()
        // Internal error message send
        res.status(500).json({
            Status: 'internal error',
            message: err
        })
    }).catch(err => {
        res.status(500).json({
            status : 'failure',
            msg : 'Internal error2',
            ERR: err
        })
    })
}

/* Elimina un producto de carrito */ 
module.exports.deleteShop = function (req, res) { 
    /* Obtener variable para la conexión a la BD */ 
    const con = require('../controllers/dbconn')() 
 
    /* Obtener los datos del Body */ 
    let data = req.body 
 
    /* Ejecutar la consulta para baja de carrito */ 
    con.query('DELETE FROM shop WHERE idShop=?',data.idShop, function (err, result, fields) { 
        if (err) { 
            // Internal error message send 
            res.status(500).json({ 
                Status: 'internal error', 
                message: err 
            }) 
            con.end() 
            return 
        } else { 
            if (result.affectedRows == 1) { 
                res.status(200).json({ 
                    Status: 'Success', 
                    message: 'Se elimino correctamente el producto' 
                }) 
            } 
        } 
    }) 
} 
 
/* Actualiza la cantidad de un producto en carrito */ 
module.exports.updateShop = function (req, res) { 
    /* Obtener variable para la conexión a la BD */ 
    const con = require('../controllers/dbconn')() 
 
    /* Obtener los datos del Body */ 
    let data = req.body 
     
    /* Establecer query para la consulta de modificar carrito*/ 
    let qry="UPDATE shop SET quantityShop=? WHERE idShop=?" 
 
    /* Establece los valores para la consulta */ 
    values = [data.quantityShop, data.idShop] 
 
    /* Ejecutar la consulta para actualizar cantidad de producto en carrito */ 
    con.query(qry, values, function (err, result, fields) { 
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
                    message: 'Se actualizo correctamente el producto' 
                }) 
            } 
        } 
    }) 
}
