/* Obtener Los tipos de usuario existentes */
module.exports.getAllProducts = function (req, res) {
    /* Obtener variable para la conexión a la BD */
    const con = require('./dbconn')();

    /* Obtener los datos del Body */
    let data = req.body;

    /* Establecer query para la consulta */
    let qry = "SELECT PROYP.idProduct, PROYP.nameProduct, PROYP.enabledProduct, PROYP.imageProduct, PRO.featuresProduct, PROYP.idCategory, C.nameCategory, PROYP.idSubcategory, SC.nameSubcategory, PRO.idDimension, D.widthDimension, D.heightDimension, PRI.publicUtilityPrice, PRI.publicPrice FROM productsyouprint AS PROYP INNER JOIN products AS PRO ON PROYP.idProduct=PRO.idProduct LEFT JOIN productsprice AS PRI ON PRO.idProduct = PRI.idProduct LEFT JOIN dimensions AS D ON PRO.idDimension = D.idDimension LEFT JOIN categories AS C ON PRO.idCategory = C.idCategory LEFT JOIN subcategories AS SC ON PRO.idSubcategory = SC.idSubcategory WHERE statusProduct = 1";

    if(data.idSubcategory && data.idCategory) {
        qry+=" AND PRO.idCategory = ? AND PRO.idSubcategory=?"
        values=[data.idSubcategory, data.idCategory];
    }
    else if(!data.idSubcategory && data.idCategory) {
        qry+=" AND PRO.idCategory = ?"
        values=[data.idCategory];
    }
    else if(data.idSubcategory && !data.idCategory) {
        qry+=" AND PRO.idSubcategory = ?"
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
            if (result.length >= 0) {
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

/* Obtener caracteristicas basicas de productos */
module.exports.getProducts = function (req, res) {
    /* Obtener variable para la conexión a la BD */
    const con = require('./dbconn')();

    /* Obtener los datos del Body */
    let data = req.body;

    /* Establecer query para la consulta */
    let qry = "SELECT PRO.idProduct, PRO.nameProduct, PRO.imageProduct, PRI.publicPrice FROM products AS PRO LEFT JOIN productsprice AS PRI ON PRO.idProduct = PRI.idProduct WHERE statusProduct = 1 AND PRO.idCategory = ? AND PRO.idSubcategory=?";

    values=[data.idCategory, data.idSubcategory];
    
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
            if (result.length >= 0) {
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
    //fs.unlinkSync(req.file.path)
    //res.send(req.file);

    /* Obtener variable para la conexión a la BD */
    const con = require('../controllers/dbconn')();

    // /* Obtener los datos del Body */
    let data = req.body;
    
    // /* Establecer query para la consulta del último insertado */
    let qry="INSERT INTO productsyouprint(idProduct, nameProduct, imageProduct, idCategory, idSubcategory, enabledProduct) VALUES(?, ?, ?, ?, ?, ?)";
    values = [data.idProduct, data.nameProduct, req.file.filename, data.idCategory, data.idSubcategory, data.enabledProduct];

    /* Ejecutar la consulta para la obtención del último id insertado en productos */
    con.query(qry,values,function (err, result, fields) {
        if (err) {
            // Internal error message send
            res.status(500).json({
                Status: 'internal error',
                message: err
            });
            con.end();
            return;
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