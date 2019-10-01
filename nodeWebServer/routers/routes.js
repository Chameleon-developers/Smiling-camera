var users=require('../controllers/users');
var login=require('../controllers/login');

module.exports = function (app,secureApp) {

    /* Validar logIn */
    app.post('/logIn',login.logIn);

    /* Obtener Los tipos de usuario existentes */
    secureApp.post('/getTypeUsers',users.getTypeUsers);

    /* Registrar un nuevo usuario */
    secureApp.post('/insertUser',users.insertUser);
    
    /* Modificar datos de un usuario existente */
    secureApp.post('/updateUser',users.updateUser);
    
    /* Obtener datos de los usuarios registrados */
    secureApp.post('/getUsers' ,users.getUsers);

    /* Eliminar usuario registrado */
    secureApp.post('/deleteUser' ,users.deleteUser);

}
