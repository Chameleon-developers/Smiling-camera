//Importación de módulos
import { toast, ip_server } from "./plugins.js"
/* toast options: is-info, is-success, is-warning, is-danger */
/* Ejecución del Js */
$(function() {
    init()
})
/* Inicializa los valores o componentes necesarios */
function init() {

    $(document).keypress(function (e) {
        if(e.keyCode == 13) login()
    });

    $( "#changePWD" ).on( "click", function() {
        $('#email').val('');
        $('#password').val('');
        grecaptcha.reset();
        $('#getBack').css('visibility', 'visible')
        $('#messageEmail').css('visibility', 'visible')

        $('#titleLogIn').text('Cambiar Contraseña')
        $('#login').prop('id','sendPwdEmail')
        $('#email').prop('placeholder','Correo de Recuperación')
        $('#sendPwdEmail').text('Mandar Correo')
        $('#sendPwdEmail').unbind()
        $('#sendPwdEmail').click( function() {
            sendPwdEmail()
        });
        
        $('#pwdContainer').toggle()
    });

    $( "#getBack" ).on( "click", function() {
        $('#email').val('');
        grecaptcha.reset();
        $('#mailContainer').css('visibility', 'visible')
        $('#getBack').css('visibility', 'hidden')
        $('#captchaGoogle').css('visibility', 'visible')
        $('#messageEmail').css('visibility', 'hidden')
        $('#messageEmail').html('Se enviara un mail a su correo electrónico de recuperación con la nueva contraseña. <strong>La contraseña anterior se borrará</strong>')

        $('#titleLogIn').text('Iniciar Sesión')
        $('#sendPwdEmail').prop('id','login')
        $('#email').prop('placeholder','Correo (Usuario)')
        $('#login').text('Iniciar sesión')
        $('#login').unbind()
        $('#login').click( function() {
            login()
        });
        
        $('#pwdContainer').toggle()
    });

    $( "#login" ).on( "click", function() {
        login()
    });

}

function sendPwdEmail(){
    toast('Cargando...','is-primary')
    var email = $('#email').val();
    const captcha = document.querySelector('#g-recaptcha-response').value;
    if(email == '') {
        toast('Ingresa algún correo','is-info')
        return null
    }
    $.ajax({
        type: "POST",
        url: ip_server + "/changePassword",
        data:{
            'resetEmail' : email,
            'captcha' : captcha
        },
        dataType: "json",
        success: function (response) {
            console.log(response);
            
            $('#getBack').css('visibility', 'hidden')
            $('#mailContainer').css('visibility', 'hidden')
            $('#captchaGoogle').css('visibility', 'hidden')
            $('#messageEmail').html('<strong>Se ha mandado el Correo con la nueva Contraseña</strong>')

            $('#sendPwdEmail').text('Ir a Iniciar sesión')
            $('#sendPwdEmail').unbind()
            $('#sendPwdEmail').click( function() {
                $( "#getBack" ).click()
            });
            toast('Se ha mandado el Correo con la nueva Contraseña','is-info')
        },
        error: function (error) {
            if(error.status == '401'){
                toast('El Correo ingresado no se encuentra registrado','is-danger')
            }
            else if(error.status == '400'){
                toast('¿Eres un Robot?','is-danger')
            }
            else if (error == 'Internal Server Error') {
                toast('Error Interno del Servidor','is-danger')
            }
            
        }
    })
    
}

/* Obtener datos ingresados, validarlos y mandarlos por ajax para ser validados en la BD */
function login(){
    var email = $('#email').val();
    var password = $('#password').val();
    if(email == '' || password == '') {
        toast('Complete los campos','is-info')
    } else {
        const captcha = document.querySelector('#g-recaptcha-response').value;
        $.ajax({
            type: "POST",
            url: ip_server + "/logIn",
            data:{
                'mainEmail' : email,
                'passwordUser' : password,
                'captcha' : captcha
            },
            dataType: "json",
            success: function (response) {
                if (response.Status == 'Success') {
                    sessionStorage.token = response.token
                    window.location.assign("http://" + window.location.hostname+"/Smiling-camera/dashboardadmin/" + response.route);
                }
            },
            error: function (error) {
                if(error.status == '401'){
                    toast('Error de Usuario o Contraseña','is-danger')
                }
                else if(error.status == '406'){
                    toast('La contraseña ingresada es incorrecta','is-danger')
                }
                else if(error.status == '400'){
                    toast('¿Eres un Robot?','is-danger')
                }
                else if (error == 'Internal Server Error') {
                    toast('Error Interno del Servidor','is-danger')
                }
                
            }
        })
    }
}