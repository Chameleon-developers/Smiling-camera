module.exports.prueba = function (req, res) {
    let msg = 'entra'
    res.status(200).json({
        Status: 'Success',
        message: msg
    });
}

/* NOTE Ejemplo */
/* module.exports.getPaises = function (req, res) {
    const con = require('../controllers/dbconn')();
    //Get Data
    let data = req.body;
    //Execute Query
    con.query('SELECT uuid,name FROM country', function (err, result, fields) {
        if (err) {
            // Internal error message send
            res.status(500).json({
                Status: 'internal error',
                message: 'Internal error'
            });
            con.end();
            return;
        } else {
            if (result.length > 0) {

                // Setup and send of response
                res.status(200).json({
                    Status: 'Success',
                    paises: result,
                    //mensaje: result[0].name
                })
            } else {
                res.status(404).json({
                    Status: 'Failure',
                    message: 'b_pass'
                })
                con.end();
            }
        }
    });
} */