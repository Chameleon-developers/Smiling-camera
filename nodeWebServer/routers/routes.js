var users=require('../controllers/users');
var login=require('../controllers/login');
var products=require('../controllers/products');
var categories=require('../controllers/categories');
var multer = require("multer");

module.exports = function (app,secureApp) {

    /* Validar logIn */
    app.post('/logIn',login.logIn);

    /* USUARIOS */

    /* Obtener Los tipos de usuario existentes */
    secureApp.post('/getTypeUsers',users.getTypeUsers);

    /* Registrar un nuevo usuario */
    secureApp.post('/insertUser',users.insertUser);
    
    /* Modificar datos de un usuario existente */
    secureApp.post('/updateUser',users.updateUser);
    
    /* Obtener datos de los usuarios registrados */
    secureApp.post('/getUsers' ,users.getUsers);

    /* Obtener datos de un usuario especifico */
    secureApp.post('/getUser' ,users.getUser);

    /* Eliminar usuario registrado */
    secureApp.post('/deleteUser' ,users.deleteUser);

    /* CATEGORIAS Y SUBCATEGORIAS */

    /* Obtener categorias existentes */
    secureApp.post('/getCategories' ,categories.getCategories);

    /* Obtener subcatehgorias existentes */
    secureApp.post('getSubcategories' ,categories.getSubcategories);

    /* PRODUCTOS */

    /* Obtener Las categorias de productos existentes */


    /* Obtener datos de productos registrados */
    app.post('/getAllProducts' ,products.getAllProducts);

    var storage = multer.diskStorage({
        destination: function(req, file, callback){
            callback(null, '../dashboardadmin/uploads'); // set the destination
        },
        filename: function(req, file, callback){
            callback(null, Date.now() + '.jpg'); // set the file name and extension
        }
    });

    var uploading = multer({

        storage: storage

    });

    /* Obtener datos de productos registrados */
    app.post('/insertProduct' , uploading.single('image'),products.insertProduct);

}
 