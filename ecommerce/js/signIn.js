//Importación de módulos
import { toast, ip_server } from "./plugins.js"

$(function() {
	$('html, body').animate({scrollTop:0}, 'slow');
	
	$('#iniciarSesion').click(function (e) {
		logIn()
    });

    $('#registrar').click(function (e) {
		registrar()
    });
})

/* Funcion para iniciar sesion */
function logIn() {
	var mainEmail = $('#mainEmail').val()
	var passwordUser = $('#passwordUser').val()

	var check = validationsUser(mainEmail, passwordUser)
	if(check) {
		$.ajax({
	        type: "POST",
	        url: ip_server + "/logInEcommerce",
	        data: {
	            'mainEmail' : mainEmail,
	            'passwordUser' : passwordUser,
	        },
	        dataType: "json",
	        success: function (response) {
	        	$('#logIn').css('display', 'none')
				$('#usuario').css('display', 'flex')
				//$('#usuario').attr('data-user', "'" + response.idUser + "'")
				window.location.assign("http://" + window.location.hostname+"/Smiling-camera/ecommerce/");
	        },
	        error: function (error) {
	            if(error.status == '401'){
	            	$('#logIn').css('display', 'flex')
					$('#usuario').css('display', 'none')
					$('#usuario').attr('data-user', '0')
	                sessionStorage.removeItem('token')
	                window.location.assign("http://" + window.location.hostname+"/Smiling-camera/ecommerce/");
	            }
	        }
	    })
	}
}

/* Funcion para registrar usuario */
function registrar() {
	var mainEmail = $('#mainEmailR').val()
	var resetEmail = $('#resetEmailR').val()
	var nameUser = $('#nameUserR').val()
	var passwordUser = $('#passwordUserR').val()
	var cPasswordUser = $('#cPasswordUserR').val()

	var check = validationsAddUser(mainEmail, resetEmail, nameUser, passwordUser, cPasswordUser)
	if(check) {
		$.ajax({
	        type: "POST",
	        url: ip_server + "/registeruser",
	        data: {
	            'mainEmail' : mainEmail,
	            'resetEmail' : resetEmail,
	            'nameUser' : nameUser,
	            'passwordUser' : passwordUser,
	            'cPasswordUser' : cPasswordUser,
	        },
	        dataType: "json",
	        success: function (response) {
	        	$('#logIn').css('display', 'none')
				$('#usuario').css('display', 'flex')
				//$('#usuario').attr('data-user', "'" + response.idUser + "'")
				window.location.assign("http://" + window.location.hostname+"/Smiling-camera/ecommerce/");
	        },
	        error: function (error) {
	            if(error.status == '401'){
	            	$('#logIn').css('display', 'flex')
					$('#usuario').css('display', 'none')
					$('#usuario').attr('data-user', '0')
	                sessionStorage.removeItem('token')
	                window.location.assign("http://" + window.location.hostname+"/Smiling-camera/ecommerce/");
	            }
	        }
	    })
	}
}

/* Función para validar que los datos de registro están correctos */
function validationsAddUser(mainEmail, resetEmail, nameUser, passwordUser, cPasswordUser) {
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

/* Función para validar que los datos de sesion están correctos */
function validationsUser(mainEmail, passwordUser) {
    if (mainEmail == '' || passwordUser == '') {
        toast('Completa los campos de inicio de sesion', 'is-warning')
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

    var pattPassword = /^(?=.*\d)(?=.*[!@#$&-.+,])(?=.*[A-Z])(?=.*[a-z])\S{8,45}$/
    if (!pattPassword.test(passwordUser)) {
        toast('La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un carácter no alfanumérico ! @ # $ & - . + ,', 'is-warning')
        return false
    }

    return true
}