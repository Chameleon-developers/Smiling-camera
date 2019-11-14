//Importación de módulos
import { toast, modal, ip_server, setTable, loadFilesInfo } from "./plugins.js"

//Exportación de módulos
export { init }

/* Función para establecer eventos y datos iniciales (idSubcategory e idCategory) */
function init() {
    $(".logOut").click(function (e) {
		e.preventDefault()
		logOut()
    });
    
    $("#updateUser").click(function (e) {
        e.preventDefault() 
		updateUser()
    });
    
    getDataUser()
}

/* Funcion para cerrar sesion */
function logOut() {
    $('#logIn').css('display', 'flex')
    $('#usuario').css('display', 'none')
    sessionStorage.removeItem('token')
    window.location.assign("http://" + window.location.hostname+"/Smiling-camera/ecommerce/");
}

/* Funcion para actualizar datos de usuario */
function updateUser() {
    var nameClient = $('#nameUser').val()
    var apPaterno = $('#apPaternoUser').val()
    var apMaterno = $('#apMaternoUser').val()
    var mainEmail = $('#mainEmail').val()
    var resetEmail = $('#resetEmail').val()
    var passwordUser = $('#passwordUser').val()
    var cPasswordUser = $('#cPasswordUser').val()

    var check

    if(passwordUser) {
        check = validationsUser(mainEmail, resetEmail, nameClient, passwordUser, cPasswordUser) 

        if(check) {
            $.ajax({
                type: "POST",
                url: ip_server + "/logged/updateShopUser",
                data: {
                    'bearer': sessionStorage.token,
                    'idUser': sessionStorage.idUser,
                    'nameClient': nameClient,
                    'apPaterno': apPaterno,
                    'apMaterno': apMaterno,
                    'resetEmail': resetEmail,
                    'passwordUser': passwordUser,
                },
                dataType: "json",
                success: function (response) {    
                    toast('Se registró correctamente la informacion','is-info')
                },
                error: function (error) {
                    if(error.status == '500'){
                        toast('No se pudo actualizar los datos, Error interno del servidor', 'is-danger')
                    }
                }
            })
        } 
    }
    else {
        check = validationsUserWithoutPassword(mainEmail, resetEmail, nameClient) 

        if(check) {
            $.ajax({
                type: "POST",
                url: ip_server + "/logged/updateShopUser",
                data: {
                    'bearer': sessionStorage.token,
                    'idUser': sessionStorage.idUser,
                    'nameClient': nameClient,
                    'apPaterno': apPaterno,
                    'apMaterno': apMaterno,
                    'resetEmail': resetEmail,
                },
                dataType: "json",
                success: function (response) {    
                    toast('Se registró correctamente la informacion','is-info')
                },
                error: function (error) {
                    if(error.status == '500'){
                        toast('No se pudo actualizar los datos, Error interno del servidor', 'is-danger')
                    }
                }
            })
        }
    }
}

/* Obtener datos de usuario */
function getDataUser() {
    $.ajax({
        type: "POST",
        url: ip_server + "/logged/getShopUser",
        data: {
            'bearer' : sessionStorage.token,
            'idUser' : sessionStorage.idUser,
        },
        dataType: "json",
        success: function (response) {

            llenaCampos(response.usuario)

        },
        error: function (error) {
            if(error.status == '401'){
                sessionStorage.removeItem('token')
            }
        }
    });
}

/* Funcion para mostrar datos de usuario */
function llenaCampos(usuario) {
    $.each(usuario, function (key, value) {
        $('#nameUser').val(value.nameClient)
        $('#apPaternoUser').val(value.apPaterno)
        $('#apMaternoUser').val(value.apMaterno)
        $('#mainEmail').val(value.nameUser)
        $('#resetEmail').val(value.resetEmail)
    })
}

/* Función para validar que los datos de registro están correctos */
function validationsUser(mainEmail, resetEmail, nameUser, passwordUser, cPasswordUser) {
    if (mainEmail == '' || resetEmail == '' || nameUser == '' || passwordUser == '' || cPasswordUser == '') {
        toast('Completa los campos de registro', 'is-warning')
        return false
    }
    
    var patt = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!patt.test(mainEmail)) {
        toast('El correo ingresado en "Correo" no es válido', 'is-warning')
        return false
    }
    if (mainEmail.length > 50) {
        toast('El correo ingresado en "Correo" no puede contener más de 50 caracteres', 'is-warning')
        return false
    }
    if (!patt.test(resetEmail)) {
        toast('El correo ingresado en "Correo para restablecer contraseña" no es válido', 'is-warning')
        return false
    }
    if (resetEmail.length > 50) {
        toast('El correo ingresado en "Correo para restablecer contraseña" no puede contener más de 50 caracteres', 'is-warning')
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

/* Función para validar que los datos de registro están correctos */
function validationsUserWithoutPassword(mainEmail, resetEmail, nameUser) {
    if (mainEmail == '' || resetEmail == '' || nameUser == '') {
        toast('Completa los campos de registro', 'is-warning')
        return false
    }
    
    var patt = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!patt.test(mainEmail)) {
        toast('El correo ingresado en "Correo" no es válido', 'is-warning')
        return false
    }
    if (mainEmail.length > 50) {
        toast('El correo ingresado en "Correo" no puede contener más de 50 caracteres', 'is-warning')
        return false
    }
    if (!patt.test(resetEmail)) {
        toast('El correo ingresado en "Correo para restablecer contraseña" no es válido', 'is-warning')
        return false
    }
    if (resetEmail.length > 50) {
        toast('El correo ingresado en "Correo para restablecer contraseña" no puede contener más de 50 caracteres', 'is-warning')
        return false
    }
    if (mainEmail == resetEmail) {
        toast('Los correos ingresados deben ser diferentes', 'is-warning')
        return false
    }

    return true
}