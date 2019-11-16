/* Registrar un Producto en carrito */
module.exports.addShop = function (req, res) {
    /* Obtener variable para la conexión a la BD */
    const con = require('../controllers/dbconn')()

    /* Obtener los datos del Body */
    let data = req.body
    
    /* Establecer query para la consulta para insertar */
    let qry="INSERT INTO shop(quantityShop, zipNameShop, idUser, idProductYouPrint) VALUES(?, ?, ?, ?)"
    if(req.file) {
        values = [data.quantityShop, req.file.filename, data.idUser, data.idProduct]
    }
    else {
        res.status(400).json({
            Status: 'Failure',
            message: 'No se subio ninguna imagen'
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

    /* Obtener los datos del Body */
    let data = req.body

    /* Establecer query para la consulta para insertar */
    let qry = 'SELECT idShop, quantityShop, zipNameShop, idProductYouPrint, PROYP.nameProduct, publicPrice FROM shop AS S INNER JOIN productsyouprint AS PROYP ON S.idProductYouPrint=PROYP.idProduct INNER JOIN productsprice AS PP ON S.idProductYouPrint=PP.idProduct WHERE idUser=?'

    /* Ejecutar la consulta para la obtención de tipos de productos */
    con.query(qry, data.idUser, function (err, result, fields) {
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