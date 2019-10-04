//Importación de módulos
import {loadFiles, toast, modal, ip_server } from "./plugins.js"
//Exportación de módulos
export { init }

/* Función para establecer eventos y datos iniciales */
function init() {
    getCategories() 
    getDimensions()
    $('#returnProduct').click(function (e){
       /* $('#addProductCategories')[0].reset();
        $('#addproductSubCategories')[0].reset();
        $('#productname')[0].reset();
        $('#addProductDimensions')[0].reset();
        $('#productcost')[0].reset();
        $('#productpic')[0].reset();
        $('#productcaract')[0].reset();*/
        loadFiles("productos.html","js/productos.js")
    });

    $('#addProductCategories').change(function (e){
        const category = $('#addProductCategories option:selected').val()
        if(category != -1) {
            getSubCategories(category);
        }
    });

  //  console.log($('#stepsAddProduct').is-completed;
}
/*$('#stepsAddProduct').options.beforeNext(function(step_id){
    switch( step_id ) {
        case 1:
          // DO YOUR VALIDATION FOR FIRST STEP (steps_id start at 0)
        if($('#addProductCategories').value == -1)
            $('#nextStep').disabled;
        else
            $('#nextStep').enabled;
          break;
        case 2:
          // DO YOUR VALIDATION FOR 2nd step
          break;
        case 2:
          // DO YOUR VALIDATION FOR 3rd STEP 
          break;
    }    
});

/*
var stepsWizard = new StepsWizard(document.getElementById("stepsDemo"), {
    'beforeNext': function( step_id ) {
      switch( step_id ) {
        case 0:
          // DO YOUR VALIDATION FOR FIRST STEP (steps_id start at 0)
          break;
        case 1:
          // DO YOUR VALIDATION FOR 2nd step
          break;
        case 2:
          // DO YOUR VALIDATION FOR 3rd STEP 
          break;
          
          
        }
    }
  } );*/




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

/* Función para agregar un nuevo usuario 
function addProduct() {
    bulmaSteps.attach();
    var mainEmail = $('#mainEmail').val()
    var resetEmail = $('#resetEmail').val()
    var nameUser = $('#nameUser').val()
    var typeUser = $( "#addTypeUsers option:selected" ).val()
    var passwordUser = $('#passwordUser').val()
    var cPasswordUser = $('#cPasswordUser').val()

    var check = validationsAddUser(mainEmail, resetEmail, nameUser, typeUser, passwordUser, cPasswordUser)
    if (check) {
        var modal = $(this).parent().parent().parent()
        $.ajax({
            type: "POST",
            url: ip_server + "/logged/insertUser",
            data: {
                'bearer' : sessionStorage.token,
                'mainEmail' : mainEmail,
                'resetEmail' : resetEmail,
                'nameUser' : nameUser,
                'idTypeUser' : typeUser,
                'passwordUser' : passwordUser,
            },
            dataType: "json",
            success: function (response) {
                toast('Se ha registrado correctamente', 'is-info')
                /* Vaciar inputs y cerrar modal 
                modal.removeClass('is-active')
                var inputsAddModal = modal.find(".input")
                $.each(inputsAddModal, function(idx, el) {
                    el.value = ""
                });
                getUsers() 
            },
            error: function (error) {
                if(error.status == '401'){
                    sessionStorage.removeItem('token')
                    window.open("index.html",'_self');
                }
                if(error.status == '406'){
                    toast('No se pudo registrar el usuario, no se han procesado correctamente los datos', 'is-warning')
                    window.open("index.html",'_self');
                }
                if(error.status == '406'){
                    toast('No se pudo registrar el usuario, Error interno del servidor', 'is-warning')
                    window.open("index.html",'_self');
                }
            }
        });
    }
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