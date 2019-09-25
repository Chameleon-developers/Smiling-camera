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

/* Función para ejecutar un toast-notification */
function toast(msg, type) {
    let notifDiv = document.createElement('div')
    notifDiv.setAttribute('class', 'notification ' + type)
    notifDiv.appendChild(document.createTextNode(msg))
    let btn = document.createElement('button')
    btn.setAttribute('class', 'delete')
    notifDiv.appendChild(btn)
    $('.toast-container').append(notifDiv)
    $(btn).click(function(e) {
        notifDiv.classList.add('hidden')
        setTimeout(() => {
            notifDiv.remove()
        }, 300);
    })
    setTimeout(() => {
        $(notifDiv).addClass('hidden');
    }, 4000);
}

/* Obtener datos ingresados, validarlos y mandarlos por ajax para ser validados en la BD */
function login(){
    email = $('#email').val();
    password = $('#password').val();
    if(email == '' || password == '') {
        toast('Complete los campos','is-warning')
    } else {
        $.ajax({
            type: "POST",
            url: "http://" + document.domain +":3500/logIn",
            data:{
                'mainEmail' : email,
                'passwordUser' : password
            },
            dataType: "json",
            success: function (response) {
                if (response.Status == 'Success') {
                    sessionStorage.token = response.token
                    window.open(response.route,'_self');
                }
            },
            error: function (error) {
                console.log(error.status); //Deberia de jalar XD
                if(error.status == '401'){
                    toast('Error de Usuario o Contraseña','is-danger')
                }
                else if(error.status == '406'){
                    toast('La contraseña ingresada es incorrecta','is-danger')
                }
                else if (error == 'Internal Server Error') {
                    toast('Error Interno del Servidor','is-danger')
                }
                
            }
        })
    }
}