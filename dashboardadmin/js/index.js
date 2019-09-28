//Importación de módulos
import { toast } from "./plugins.js"

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
        toast('Complete los campos','is-warning')
    } else {
        const captcha = document.querySelector('#g-recaptcha-response').value;
        $.ajax({
            type: "POST",
            url: "http://" + document.domain +":3500/logIn",
            data:{
                'mainEmail' : email,
                'passwordUser' : password,
                'captcha' : captcha
            },
            dataType: "json",
            success: function (response) {
                if (response.Status == 'Success') {
                    sessionStorage.token = response.token
                    window.open(response.route,'_self');
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