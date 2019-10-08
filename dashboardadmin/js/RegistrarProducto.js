//Importación de módulos
import {loadFiles, toast, modal, ip_server } from "./plugins.js"
//Exportación de módulos
export { init }

/* Función para establecer eventos y datos iniciales */
function init() {
    getCategories() 
    getDimensions()
    $('#returnProduct').click(function (e){
        loadFiles("productos.html","js/productos.js")
    });

    var form = $("#example-advanced-form").show();
 
    form.steps({
        headerTag: "h2",
        bodyTag: "fieldset",
        transitionEffect: "slideLeft",
        onStepChanging: function (event, currentIndex, newIndex)
        {
            console.log(event);
            if (currentIndex == 0 && ($("#addProductCategories option:selected").val()) == -1)
            {
                form.steps("previous");
                return false;
            }
            if (currentIndex == 1 && ($("#addProductSubCategories option:selected").val()) == -1)
            {
                form.steps("previous");
                return false;
            }
            // Allways allow previous action even if the current form is not valid!
            if (currentIndex > newIndex)
            {
                return true;
            }
            // Needed in some cases if the user went back (clean up)
            if (currentIndex < newIndex)
            {
                // To remove error styles
                form.find(".body:eq(" + newIndex + ") label.error").remove();
                form.find(".body:eq(" + newIndex + ") .error").removeClass("error");
            }
            form.validate().settings.ignore = ":disabled,:hidden";
            return form.valid();
        },
        onStepChanged: function (event, currentIndex, priorIndex)
        {
           
            // Used to skip the "Warning" step if the user is old enough.
            if (currentIndex === 2 && Number($("#age-2").val()) >= 18)
            {
                form.steps("next");
            }
            // Used to skip the "Warning" step if the user is old enough and wants to the previous step.
            if (currentIndex === 2 && priorIndex === 3)
            {
                form.steps("previous");
            }
        },
        onFinishing: function (event, currentIndex)
        {
            form.validate().settings.ignore = ":disabled";
            return form.valid();
        },
        onFinished: function (event, currentIndex)
        {
            addProduct()
        }
    });

    $('#addProductCategories').change(function (e){
        const category = $('#addProductCategories option:selected').val()
        if(category != -1) {
            getSubCategories(category);
        }
    });
}

/* Función para consultar las categorias de productos que existen */
function getCategories() {
    $.ajax({
        type: "POST",
        url: ip_server + "/logged/getCategories",
        data: {
            'bearer' : sessionStorage.token,
        },
        dataType: "json",
        success: function (response) {

            setSelectProductCategories(response.categories)

        },
        error: function (error) {
            if(error.status == '401'){
                sessionStorage.removeItem('token')
            }
        }
    });
}

/* Función para agregar las categorias de productos al select */
function setSelectProductCategories(productCategories) {
    $.each(productCategories, function (key, value) {
        let option = document.createElement('option')
        option.textContent = value.nameCategory.split(' ')[0]
        option.value = value.idCategory
        $('#addProductCategories').append(option)
    })
}
/*--------------------------------------------------------------------------------------------------- 
/* Función para consultar las subcategorias de productos que existen */
function getSubCategories(idCategory) {
    $.ajax({
        type: "POST",
        url: ip_server + "/logged/getSubcategories",
        data: {
            'bearer' : sessionStorage.token,
            'idCategory': idCategory,
        },
        dataType: "json",
        success: function (response) {

            setSelectProductSubCategories(response.subcategories)

        },
        error: function (error) {
            if(error.status == '401'){
                sessionStorage.removeItem('token')
            }
        }
    });
}

/* Función para agregar las subcategorias de productos al select */
function setSelectProductSubCategories(productSubcategories) {
    $.each(productSubcategories, function (key, value) {
        let option = document.createElement('option')
        option.textContent = value.nameSubcategory.split(' ')[0]
        option.value = value.idSubcategory
        $('#addProductSubCategories').append(option)
    })
}

/*--------------------------------------------------------------------------------------------------- 
/* Función para consultar las dimensiones de productos que existen */
function getDimensions() {
    $.ajax({
        type: "POST",
        url: ip_server + "/logged/getDimensions",
        data: {
            'bearer' : sessionStorage.token,
        },
        dataType: "json",
        success: function (response) {

            setSelectProductDimensions(response.dimensions)

        },
        error: function (error) {
            if(error.status == '401'){
                sessionStorage.removeItem('token')
                window.open("index.html",'_self');
            }
        }
    });
}

/* Función para agregar las categorias de productos al select */
function setSelectProductDimensions(productDimensions) {
    $.each(productDimensions, function (key, value) {
        let option = document.createElement('option')
        option.textContent = value.dimensions.split(' ')[0]
        option.value = value.idDimension
        $('#addProductDimensions').append(option)
    })
}

/* Función para obtener los usuarios ya registrados 
function getUsers(){
    $.ajax({
        url: ip_server +
        "/logged/getUsers",
        type: "POST",
        data:{
            'bearer' : sessionStorage.token,
        },
        dataType: "json",
        success: function (response) {
            const table=$("#table").DataTable()
            var dataSet = response.users;
            var tipo = ""
            
            //Limpiar tabla
            table.clear()

            //insertar datos
            for (const usr of dataSet) {
                var iconContainer = "<a style='color: #9696D4'><span class='icon'><i class='fas fa-lg fa-pen'></i></span></a>" + "<a href='#' style='padding-left: 35px;color: #F74784' ><span class='icon'><i class='fas fa-lg fa-trash-alt'></i></span></a>";
                
                if (usr.idTypeUser == 1) {
                    tipo = "Administrador";
                } else {
                    tipo = "Operador";
                }

                table.row.add([
                    usr.nameUser,
                    usr.mainEmail,
                    tipo,
                    iconContainer
                ])
            }
            table.draw();
        },
        error: function (error) {
            if(error.status == '401'){
                sessionStorage.removeItem('token')
                window.open("index.html",'_self');
            }
        }
    });
}

/* Función para agregar un nuevo usuario */
function addProduct() {
    var category = $('#addProductCategories option:selected').val();
    var subcategory = $('#addproductSubCategories option:selected').val();
    var nameProduct = $('#productname').val();
    var idDimension = $('#addProductDimensions option:selected').val();
    var productCost = $('#productcost').val();
    var productCaract = $('#productcaract').val();

    const form_data = new FormData();
    form_data.append('image', $('#productpic')[0].files[0]);
    form_data.append('category', category);
    form_data.append('subcategory', subcategory);
    form_data.append('nameProduct', nameProduct);
    form_data.append('idDimension', idDimension);
    form_data.append('productCost', productCost);
    form_data.append('productPic', productPic);
    form_data.append('productCaract', productCaract);


    $.ajax({
        type: "POST",
        url: ip_server + "/logged/insertProduct",
        data: form_data,
        contentType : false,
        processData: false,
        dataType: "json",
        success: function (response) {
            toast('Se ha registrado correctamente', 'is-info')
        },
        error: function (error) {
            if(error.status == '401'){
                sessionStorage.removeItem('token')
                window.open("index.html",'_self');
            }
            if(error.status == '406'){
                toast('No se pudo registrar el producto, no se han procesado correctamente los datos', 'is-warning')
                window.open("index.html",'_self');
            }
            if(error.status == '406'){
                toast('No se pudo registrar el uproducto, Error interno del servidor', 'is-warning')
                window.open("index.html",'_self');
            }
        }
    });
}

/* Función para validar que los datos ingresados están correctos 
function validationsAddUser(mainEmail, resetEmail, nameUser, typeUser, passwordUser, cPasswordUser) {
    if (mainEmail == '' || resetEmail == '' || nameUser == '' || passwordUser == '' || cPasswordUser == '') {
        toast('Completa los campos', 'is-warning')
        return false
    }
    if (typeUser == 0) {
        toast('Selecciona un tipo de usuario', 'is-warning')
        return false
    }
    
    var pattMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!pattMail.test(mainEmail) && mainEmail.lenght < 50) {
        toast('El correo ingresado en "Correo (Usuario)" no es válido', 'is-warning')
        return false
    }
    if (!pattMail.test(resetEmail) && resetEmail.lenght < 50) {
        toast('El correo ingresado en "Correo para restablecer Contraseña" no es válido', 'is-warning')
        return false
    }
    if (mainEmail == resetEmail) {
        toast('Los correos ingresados deben ser diferentes', 'is-warning')
        return false
    }
    var pattPassword = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,45}$/
    if (!pattPassword.test(passwordUser)) {
        toast('La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un carácter no alfanumérico.', 'is-warning')
        return false
    }
    if (passwordUser != cPasswordUser) {
        toast('Las contraseñas ingresadas deben coincidir', 'is-warning')
        return false
    }
    return true
}
*/