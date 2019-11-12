//Importación de módulos
import { toast, ip_server } from "./plugins.js"

//Exportación de módulos
export { init }

function init() {

	$('.g-recaptcha').each(function(index, el) {
        var widgetId = grecaptcha.render(el, {'sitekey' : '6Ld-g7oUAAAAAI-HUfcZOGiFRkAx4VjJfMkKUnlQ'});
        jQuery(this).attr('data-widget-id', widgetId);
    });

	$('html, body').animate({scrollTop:0}, 'slow');
	
	$('#iniciarSesion').click(function (e) {
		//console.log(grecaptcha.getResponse(jQuery('#captchaGoogle').attr('data-widget-id')));
		logIn()
    });

    $('#registrar').click(function (e) {
		//console.log(grecaptcha.getResponse(jQuery('#captchaGoogle2').attr('data-widget-id')));
		registrar()
    });
}

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
				'captcha': grecaptcha.getResponse(jQuery('#captchaGoogle').attr('data-widget-id'))
	        },
	        dataType: "json",
	        success: function (response) {
				//console.log(response);
				
	        	$('#logIn').css('display', 'none')
				$('#usuario').css('display', 'flex')
				$('#usuario').attr('data-user', "'" + response.token + "'")
				sessionStorage.token = response.token
				window.location.assign("http://" + window.location.hostname+"/Smiling-camera/ecommerce/");
	        },
	        error: function (error) {
	            if(error.status == '401'){
	            	$('#logIn').css('display', 'flex')
					$('#usuario').css('display', 'none')
					$('#usuario').attr('data-user', '0')
	                /* sessionStorage.removeItem('token')
					window.location.assign("http://" + window.location.hostname+"/Smiling-camera/ecommerce/"); */
					toast('Error de Usuario o Contraseña','is-danger')
				}
                else if(error.status == '406'){
                    toast('La contraseña ingresada es incorrecta','is-danger')
                }
				if(error.status == '400'){
					toast('¿Eres un Robot?','is-danger')
				}
				if(error.status == '500'){
					toast('No se pudo iniciar sesión, Error interno del servidor', 'is-danger')
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
	        url: ip_server + "/registerUser",
	        data: {
	            'mainEmail' : mainEmail,
	            'resetEmail' : resetEmail,
	            'nameUser' : nameUser,
	            'passwordUser' : passwordUser,
				'cPasswordUser' : cPasswordUser,
				'captcha': grecaptcha.getResponse(jQuery('#captchaGoogle2').attr('data-widget-id'))
	        },
	        dataType: "json",
	        success: function (response) {
	        	$('#logIn').css('display', 'none')
				$('#usuario').css('display', 'flex')
				//$('#usuario').attr('data-user', "'" + response.idUser + "'")
				//window.location.assign("http://" + window.location.hostname+"/Smiling-camera/ecommerce/");
				toast('Se registró correctamente, ya puede Iniciar Sesión','is-info')
	        },
	        error: function (error) {
	            /* if(error.status == '401'){
	            	$('#logIn').css('display', 'flex')
					$('#usuario').css('display', 'none')
					$('#usuario').attr('data-user', '0')
	                //sessionStorage.removeItem('token')
					//window.location.assign("http://" + window.location.hostname+"/Smiling-camera/ecommerce/");
					toast('401', 'is-warning')
				} */
				if(error.status == '400'){
					toast('¿Eres un Robot?','is-danger')
				}
                if(error.status == '406'){
                    toast('No se pudo registrar el usuario, no se han procesado correctamente los datos', 'is-warning')
                }
                if(error.status == '409'){
                    toast('El correo ingresado ya se encuentra registrado', 'is-warning')
                }
                if(error.status == '500'){
                    toast('No se pudo registrar el usuario, Error interno del servidor', 'is-warning')
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