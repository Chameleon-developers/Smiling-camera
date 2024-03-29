var users=require('../controllers/users');
var login=require('../controllers/login');
var products=require('../controllers/products');
var categories=require('../controllers/categories');
var kioscos=require('../controllers/kioscos');
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
    secureApp.post('/getSubcategories' ,categories.getSubcategories);

    
    /* PRODUCTOS */

    /* Obtener datos de productos registrados */
    secureApp.post('/getAllProducts' ,products.getAllProducts);

    /* obtener nombre e id de productos registrados */
    secureApp.post('/getProducts', products.getProducts);

    /* obtener los datos basicos de productos registrados */
    secureApp.post('/getProductsById', products.getProductsById);

    /* Eliminar un producto (baja logica) */
    secureApp.post('/deleteProduct' ,products.deleteProduct);

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

    /* Registrar un nuevo producto */
    app.post('/insertProduct' , uploading.single('image'),products.insertProduct);   
    
    /* Modificar los datos de un producto existente */
    app.post('/updateProduct' , uploading.single('image'),products.updateProduct); 


    /* Kioscos */

    /* Registrar un nuevo kiosco */
    secureApp.post('/insertKiosco',kioscos.insertKiosco);
    
    /* Obtener datos de los kioscos registrados */
    secureApp.post('/getAllKioscos' ,kioscos.getAllKioscos);

    /* Obtener datos de un kiosco registrado */
    secureApp.post('/getKiosco' ,kioscos.getKiosco);
    
    /* Actualizar datos de kiosko */
    secureApp.post('/updateKiosco', kioscos.updateKiosco);

    /* Eliminar kiosco (baja logica) */
    secureApp.post('/deleteKiosco', kioscos.deleteKiosco);
}
 
