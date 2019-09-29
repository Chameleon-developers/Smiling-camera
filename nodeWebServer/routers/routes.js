var users=require('../controllers/users');
var login=require('../controllers/login');

module.exports = function (app,secureApp) {

    /* Validar logIn */
    app.post('/logIn',login.logIn);

    /* Obtener Los tipos de usuario existentes */
    secureApp.get('/getTypeUsers',users.getTypeUsers);

    /* Registrar un nuevo usuario */
    secureApp.post('/insertUser',users.insertUser);
    
    /* Modificar datos de un usuario existente */
    secureApp.post('/updateUser',users.updateUser);
    
    /* Obtener datos de los usuarios registrados */
    secureApp.post('/getUsers' ,users.getUsers);

    /* Eliminar usuario registrado */
    secureApp.post('/deleteUser' ,users.deleteUser);

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
