//Exportación de módulos
export { init }

//Importación de módulos
import { toast, modal, ip_server, setTable } from "./plugins.js"
/* toast options: is-info, is-success, is-warning, is-danger */

/* Función para establecer eventos y datos iniciales */
function init() {
    
    setTable('table')
    getTypeUsers()
    getUsers()

    /* Set Clics */
    $('#addUser').click(addUser);
    $("#delUser").click(deleteUser);

}

/* Función para consultar los tipos de usuarios que existen */
function getTypeUsers() {
    $.ajax({
        type: "POST",
        url: ip_server + "/logged/getTypeUsers",
        data: {
            'bearer' : sessionStorage.token,
        },
        dataType: "json",
        success: function (response) {

            setSelectTypeUsers(response.typeUsers)

        },
        error: function (error) {
            if(error.status == '401'){
                sessionStorage.removeItem('token')
                window.open("index.html",'_self');
            }
        }
    });
}

/* Función para agregar los tipos de usuarios a los selects  */
function setSelectTypeUsers(typeUsers) {
    $.each(typeUsers, function (key, value) {
        let option = document.createElement('option')
        option.textContent = value.typeUser.split(' ')[0]
        option.value = value.idTypeUser
        $('#addTypeUsers').append(option)
    })
}

/* Función para obtener los usuarios ya registrados */
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
                //<a class="button modal-button colorBlue" data-target="#modalAddUser">
                var iconContainer = "<a class='modal-button' data-target='#modalEditUser' style='color: #9696D4'><span class='icon'><i class='fas fa-lg fa-pen'></i></span></a>" + "<a class='modal-button deleteUsr' data-u='"+usr.idManagerUser+"' data-target='#modalDelUser' style='padding-left: 35px;color: #F74784' ><span class='icon'><i class='fas fa-lg fa-trash-alt'></i></span></a>";
                //boton eliminar
                //$('#delUser').click(deleteUser(usr.idManagerUser));
                //$(document).on('click','.deleteUsr',deleteUser(usr.idManagerUser));
                
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
            modal()

            $(".deleteUsr").click(function(e){
                $("#delUser").attr('data-u', $(this).attr('data-u'));
                
            });
            
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
function addUser() {
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
                /* Vaciar inputs y cerrar modal */
                modal.removeClass('modal-active')
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
                }
                if(error.status == '406'){
                    toast('No se pudo registrar el usuario, Error interno del servidor', 'is-warning')
                }
            }
        });
    }
}

/* Función para validar que los datos ingresados están correctos */
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
    var pattPassword = /^(?=.*\d)(?=.*[!@#$&-.+,])(?=.*[A-Z])(?=.*[a-z])\S{8,45}$/
    if (!pattPassword.test(passwordUser)) {
        toast('La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un carácter no alfanumérico ! @ # $ & - . + ,', 'is-warning')
        return false
    }
    if (passwordUser != cPasswordUser) {
        toast('Las contraseñas ingresadas deben coincidir', 'is-warning')
        return false
    }
    return true
}

/*Funcion para eliminar un registro*/
function deleteUser(){
    var idManagerUser = $("#delUser").attr('data-u');
    $.ajax({
        url: ip_server +
        "/logged/deleteUser",
        type: "POST",
        data:{
            'bearer' : sessionStorage.token,
            'idManagerUser' : idManagerUser
        },
        dataType: "json",
        success: function (response) {
            toast('Se ha eliminado el usuario correctamente', 'is-info')
            modal.removeClass('is-active')
            getUsers()
        }
    });
  }
