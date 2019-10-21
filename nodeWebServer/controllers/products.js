/* Obtener Los tipos de usuario existentes */
module.exports.getAllProducts = function (req, res) {
    /* Obtener variable para la conexión a la BD */
    const con = require('./dbconn')();

    /* Obtener los datos del Body */
    let data = req.body;

    /* Establecer query para la consulta */
    let qry = "SELECT PROYP.idProduct, PROYP.nameProduct, PROYP.enabledProduct, PROYP.imageProduct, PRO.featuresProduct, PROYP.idCategory, C.nameCategory, PROYP.idSubcategory, SC.nameSubcategory, PRO.idDimension, D.widthDimension, D.heightDimension, PRI.publicUtilityPrice, PRI.publicPrice FROM productsyouprint AS PROYP INNER JOIN products AS PRO ON PROYP.idProduct=PRO.idProduct AND PROYP.statusProduct=1 LEFT JOIN productsprice AS PRI ON PRO.idProduct = PRI.idProduct LEFT JOIN dimensions AS D ON PRO.idDimension = D.idDimension LEFT JOIN categories AS C ON PRO.idCategory = C.idCategory LEFT JOIN subcategories AS SC ON PRO.idSubcategory = SC.idSubcategory WHERE PRO.statusProduct = 1";

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

/* Obtener 3 a 9 productos de manera aleatoria para carrusel */
module.exports.getProductsRandom = function(req, res) {
     /* Obtener variable para la conexión a la BD */
    const con = require('./dbconn')();

    /* Establecer query para la consulta */
    let qry = "SELECT PROYP.idProduct, PROYP.nameProduct, PROYP.imageProduct, PRI.publicPrice FROM productsyouprint AS PROYP INNER JOIN products AS PRO ON PROYP.idProduct=PRO.idProduct AND PROYP.statusProduct=1 INNER JOIN productsprice AS PRI ON PRO.idProduct = PRI.idProduct  WHERE PRO.statusProduct = 1 ORDER BY RAND() LIMIT 9";

    /* Ejecutar la consulta para la obtención de tipos de productos */
    con.query(qry,[], function (err, result, fields) {
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
    /* Obtener variable para la conexión a la BD */
    const con = require('../controllers/dbconn')();

    // /* Obtener los datos del Body */
    let data = req.body;
    
    // /* Establecer query para la consulta para insertar */
    let qry="INSERT INTO productsyouprint(idProduct, nameProduct, imageProduct, idCategory, idSubcategory, enabledProduct) VALUES(?, ?, ?, ?, ?, ?)";
    if(req.file) {
        values = [data.idProduct, data.nameProduct, req.file.filename, data.idCategory, data.idSubcategory, data.enabledProduct];
    }
    else {
        values = [data.idProduct, data.nameProduct, "default.png", data.idCategory, data.idSubcategory, data.enabledProduct];
    }

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
    });    
}

/* Modificar un producto existente */
module.exports.updateProduct = function (req, res) {
    /* Obtener variable para la conexión a la BD */
    const con = require('../controllers/dbconn')();

    // /* Obtener los datos del Body */
    let data = req.body;
    
    // /* Establecer query para la consulta de modificar producto */
    let qry="UPDATE  productsyouprint SET nameProduct=?, imageProduct=?, enabledProduct=? WHERE idProduct=?";

    if(req.file) {
        values = [data.nameProduct, req.file.filename, data.enabledProduct, data.idProduct];
    }
    else {
        values = [data.nameProduct, data.imageProduct, data.enabledProduct, data.idProduct];
    }

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
                    message: 'Se actualizo correctamente el producto'
                })
            }
        }
    });
}

/* Elimina un producto (baja logica) */
module.exports.deleteProduct = function (req, res) {
    /* Obtener variable para la conexión a la BD */
    const con = require('../controllers/dbconn')();

    /* Obtener los datos del Body */
    let data = req.body;
    values=[data.idProduct];
    console.log(data)

    /* Ejecutar la consulta para baja de productos */
    con.query('UPDATE productsyouprint SET statusProduct=0 WHERE idProduct=?',values, function (err, result, fields) {
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
                    message: 'Se elimino correctamente el producto'
                })
            }
        }
    });
}