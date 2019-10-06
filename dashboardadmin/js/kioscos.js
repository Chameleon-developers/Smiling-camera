//Exportación de módulos
export { init }

//Importación de módulos
import {loadFiles, toast, modal, ip_server, setTable } from "./plugins.js"
/* toast options: is-info, is-success, is-warning, is-danger */

/* Función para establecer eventos y datos iniciales */
function init() {
    $('#requestsKioks').click(function (e) {
        loadFiles("SolicitudesKioscos.html", "js/SolicitudesKioscos.js")
    });

    setTable('table')
    getUsers()
}



/* Función para agregar los usuarios al select de editar  */
function setSelectUsers(Users) {
    $.each(Users, function (key, value) {
        let option = document.createElement('option')
        option.textContent = value.idUser.split(' ')[0]
        option.value = value.nameUser
        $('#addUserKiosk').append(option)
    })
}

/* Función para obtener los usuarios ya registrados */
function getUsers(){
    $.ajax({
        url: ip_server +
        "/logged/getKiosks",
        type: "POST",
        data:{
            'bearer' : sessionStorage.token,
        },
        dataType: "json",
        success: function (response) {
            const table=$("kioskTable").DataTable()
            var dataSet = response.kiosks;
            var tipo = ""
            
            //Limpiar tabla
            table.clear()

            //insertar datos
            for (const kiosk of dataSet) {
                //<a class="button modal-button colorBlue" data-target="#modalAddUser">
                var iconContainer = "<a class='modal-button' data-target='#modalEditKiosk' style='color: #9696D4'><span class='icon'><i class='fas fa-lg fa-pen'></i></span></a>" + "<a href='#' style='padding-left: 35px;color: #F74784' ><span class='icon'><i class='fas fa-lg fa-trash-alt'></i></span></a>";
                
                if (kiosk.idTypeUser == 1) {
                    tipo = "Administrador";
                } else {
                    tipo = "Operador";
                }

                table.row.add([
                    kiosk.idKiosk,
                    kiosk.nameKiosk,
                    kiosk.nameUser,
                    tipo,
                    iconContainer
                ])
            }
            setSelectUsers(Users);
            table.draw();
            modal()
        },
        error: function (error) {
            if(error.status == '401'){
                sessionStorage.removeItem('token')
                window.open("index.html",'_self');
            }
        }
    });
}


/* Función para validar que los datos ingresados están correctos */
function validationsEditKiosk(mainEmail, resetEmail, nameUser, typeUser, passwordUser, cPasswordUser) {
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


/*Funcion para eliminar un registro*/
function deleteKiosk(idKiosk){
    $.ajax({
        url: ip_server +
        "/logged/deleteKiosk",
        type: "POST",
        data:{
            'bearer' : sessionStorage.token,
            'idKiosk' : idKiosk
        },
        dataType: "json",
        success: function (response) {
            var dataSet = response.users;
            console.log(dataSet);
        }
    });
}