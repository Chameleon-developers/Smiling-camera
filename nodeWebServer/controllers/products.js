const fs = require('fs');

/* Obtener Los tipos de usuario existentes */
module.exports.getAllProducts = function (req, res) {
    /* Obtener variable para la conexión a la BD */
    const con = require('./dbconn')();

    /* Obtener los datos del Body */
    let data = req.body;

    /* Establecer query para la consulta */
    let qry = "SELECT PRO.idProduct, PRO.nameProduct, PRO.imageProduct, PRO.enableProduct, PRO.featuresProduct, PRO.idCategory, C.nameCategory, PRO.idSubcategory, SC.nameSubcategory, PRO.idDimension, D.widthDimension, D.heightDimension, PRI.publicUtilityPrice, PRI.publicPrice FROM products AS PRO LEFT JOIN productsprice AS PRI ON PRO.idProduct = PRI.idProduct LEFT JOIN dimensions AS D ON PRO.idDimension = D.idDimension LEFT JOIN categories AS C ON PRO.idCategory = C.idCategory LEFT JOIN subcategories AS SC ON PRO.idSubcategory = SC.idSubcategory WHERE statusProduct = 1"

    if(data.idSubcategory && data.idCategory) {
        qry+=" AND idCategory = ? AND idSubcategory=?"
        values=[data.idSubcategory, data.idCategory];
    }
    else if(!data.idSubcategory && data.idCategory) {
        qry+=" AND idCategory = ?"
        values=[data.idCategory];
    }
    else if(data.idSubcategory && !data.idCategory) {
        qry+=" AND idSubcategory = ?"
        values=[data.idSubcategory];
    }
    else {
        values=[]; 
    }
    
    /* Ejecutar la consulta para la obtención de tipos de productos */
    con.query(qry,values, function (err, result, fields) {
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
                result.forEach(function(element) {
                    element.featuresProduct = JSON.parse(element.featuresProduct);
                });

                // Setup and send of response
                res.status(200).json({
                    Status: 'Success',
                    products: result,
                    message: 'Datos de los productos'
                })
            } else {
                res.status(400).json({
                    Status: 'Failure',
                    message: 'No existen productos'
                })
                con.end();
            }
        }
    });
}

/* Registrar un nuevo Producto */
module.exports.insertProduct = function (req, res) {
    console.log(req.file);
    //fs.unlinkSync(req.file.path)
    res.send(req.file);

    /* Obtener variable para la conexión a la BD */
    // const con = require('../controllers/dbconn')();

    // /* Obtener los datos del Body */
    // let data = req.body;
    
    // /* Establecer query para la consulta del último insertado */
    // let qry="SELECT MAX(idProduct) AS ID FROM products"

    // /* Ejecutar la consulta para la obtención del último id insertado en productos */
    // con.query(qry,function (err, result, fields) {
    //     if (err) {
    //         // Internal error message send
    //         res.status(500).json({
    //             Status: 'internal error',
    //             message: err
    //         });
    //         con.end();
    //         return;
    //     } else {

    //         let lastInserted = ""

    //         if (result[0].ID == null) {
    //             lastInserted = 1
    //         } else {
    //             lastInserted = parseInt(result[0].ID) + 1
    //         }

    //         insertProductNext(lastInserted, con, data)

    //     }
    // })
    
}

/* Modificar un producto existente */
module.exports.updateProduct = function (req, res) {

}

/* Elimina un producto (baja logica) */
module.exports.deleteProduct = function (req, res) {
    /* Obtener variable para la conexión a la BD */
    const con = require('../controllers/dbconn')();

    /* Obtener los datos del Body */
    let data = req.body;
    values=[data.idProduct];

    /* Ejecutar la consulta para baja de productos */
    con.query('UPDATE products SET statusProduct=0 WHERE idProduct=?',values, function (err, result, fields) {
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
                    message: 'Se elimino correctamente el el producto'
                })
            } else {
                res.status(400).json({
                    Status: 'Failure',
                    message: 'No existe producto para dar de baja'
                })
                con.end();
            }
        }
    });
}

function insertProductNext(lastInserted, con, data) {
    /* Establecer query para la insersión */
    let qry="INSERT INTO `products` (`idProduct`, `nameProduct`, `imageProduct`, `enableProduct`, `featuresProduct`, `statusProduct`, `idCategory`, `idSubcategory`, `idDimension`, `idBrand`, `idSubsubline`, `idSubline`, `idUnit`) VALUES (?, ?, 'files/products/defaultp.jpg', '1', '', '1', '', '', NULL, NULL, NULL, NULL, NULL)"

    /* Ejecutar la consulta para la obtención del último id insertado en productos */
    con.query(qry,function (err, result, fields) {
        if (err) {
            // Internal error message send
            res.status(500).json({
                Status: 'internal error',
                message: err
            });
            con.end();
            return;
        } else {

            let lastInserted = ""
            
            if (result[0].ID == null) {
                lastInserted = 1
            } else {
                lastInserted = parseInt(result[0].ID) + 1
            }

            console.log(lastInserted);
            

        }
    })
}