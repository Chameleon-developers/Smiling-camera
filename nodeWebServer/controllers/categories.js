/* Obtener las categorias existentes */
module.exports.getCategories = function (req, res) {
    /* Obtener variable para la conexión a la BD */
    const con = require('../controllers/dbconn')()

    /* Ejecutar la consulta para la obtención de categorias */
    con.query('SELECT idCategory, nameCategory FROM categories WHERE statusCategory=1', function (err, result, fields) {
        if (err) {
            // Internal error message send
            res.status(500).json({
                Status: 'Internal Error',
                message: 'Internal Error'
            })
            con.end()
            return
        } else {
            if (result.length > 0) {

                // Setup and send of response
                res.status(200).json({
                    Status: 'Success',
                    categories: result,
                    message: 'Datos de las categorias'
                })
            } else {
                res.status(400).json({
                    Status: 'Failure',
                    message: 'No existen categorias para e-commerce YouPrint'
                })
                con.end()
            }
        }
    })
}

/* Obtener las subcategorias existentes */
module.exports.getSubcategories = function (req, res) {
    /* Obtener variable para la conexión a la BD */
    const con = require('../controllers/dbconn')()

    /* Obtener los datos del Body */
    let data = req.body
    values=[data.idCategory]

    /* Ejecutar la consulta para la obtención de subcategorias */
    con.query('SELECT idSubcategory, nameSubcategory FROM subcategories WHERE statusSubcategory=1 AND idCategory=?',values, function (err, result, fields) {
        if (err) {
            // Internal error message send
            res.status(500).json({
                Status: 'Internal Error',
                message: 'Internal Error'
            })
            con.end()
            return
        } else {
            if (result.length > 0) {

                // Setup and send of response
                res.status(200).json({
                    Status: 'Success',
                    subcategories: result,
                    message: 'Datos de las subcategorias'
                })
            } else {
                res.status(400).json({
                    Status: 'Failure',
                    message: 'No existen subcategorias para e-commerce YouPrint'
                })
                con.end()
            }
        }
    })
}

/* Obtener las subcategorias existentes */
module.exports.getSubcategoriesEcommerce = function (req, res) {
    /* Obtener variable para la conexión a la BD */
    const con = require('../controllers/dbconn')()

    /* Ejecutar la consulta para la obtención de subcategorias */
    con.query('SELECT idSubcategory, nameSubcategory FROM subcategories WHERE statusSubcategory = 1', function (err, result, fields) {
        if (err) {
            // Internal error message send
            res.status(500).json({
                Status: 'Internal Error',
                message: 'Internal Error'
            })
            con.end()
            return
        } else {
            if (result.length > 0) {

                // Setup and send of response
                res.status(200).json({
                    Status: 'Success',
                    subcategories: result,
                    message: 'Datos de las subcategorias'
                })
            } else {
                res.status(400).json({
                    Status: 'Failure',
                    message: 'No existen subcategorias para e-commerce YouPrint'
                })
                con.end()
            }
        }
    })
}