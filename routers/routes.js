//var prueba=require('../controllers/prueba');
var users=require('../controllers/users');

module.exports = function (app,secureApp) {

    /* Obtener Los tipos de usuario existentes */
    app.get('/getTypeUsers',users.getTypeUsers);

    /* Registrar un nuevo usuario */
    app.post('/insertUser',users.insertUser);

    /* NOTE Ejemplos */
    /* app.get('/prueba' , (req,res)=>{
        res.status(200).json({
            status : 'ok',
            msg : 'prueba Routes Con GET'
        })
    })

    app.post('/prueba' , (req,res)=>{
        res.status(200).json({
            status : 'ok',
            msg : 'prueba Routes Con POST'
        })
    }) */
}
