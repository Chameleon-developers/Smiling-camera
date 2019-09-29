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

    $('#login').click(function () {
        login()
    })

}

/* Obtener datos ingresados, validarlos y mandarlos por ajax para ser validados en la BD */
function login(){
    email = $('#email').val();
    password = $('#password').val();
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