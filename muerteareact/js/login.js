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
        toast('gsggag','is-info')
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
        M.toast({html : 'Complete los campos'})
    } else {
        $.ajax({
            type: "POST",
            url: "access/index.php",
            data:{
                'usr' : user,
                'pwd' : pwd
            },
            dataType: "json",
            success: function (response) {
                if (response.status == 200) {
                    window.open('main.html','_self');
                } else {
                    M.toast({html : 'Error de Usuario o Contraseña'})
                }
            },
            error: function (error) {
                console.log(error);
                M.toast({html : 'Error Interno del Servidor'})
            }
        })
    }
}