//Exportación de módulos
export { init }

//Importación de módulos
import { toast, modal, ip_server, setTable } from "./plugins.js"
/* toast options: is-info, is-success, is-warning, is-danger */

/* Función para establecer eventos y datos iniciales */
function init() {
   /* $('#requestsKioks').click(function (e) {
        loadFiles("SolicitudesKioscos.html", "js/SolicitudesKioscos.js")
    });*/
    
    setTable('table')
    modal()
    getKiosks()
    $('#addKiosk').click(addKiosk);
    //$('#modalAddKiosk').click(addKiosk);
}



/* Función para agregar un nuevo kiosco */
function addKiosk() {
    var nameKiosk = $('#nameKiosk').val()
    var userKiosk = $('#userKiosk').val()//correo
    var passwordKiosk = $('#passwordKiosk').val()
    var cPasswordKiosk = $('#cPasswordKiosk').val()

    var check = validationsAddKiosk(nameKiosk,userKiosk, passwordKiosk, cPasswordKiosk)
    if (check) {
        var modal = $(this).parent().parent().parent()
        
        $.ajax({
            type: "POST",
            url: ip_server + "/logged/insertKiosco",
            data: {
                'bearer' : sessionStorage.token,
                'nameKiosco' : nameKiosk,
                'nameUser' : userKiosk,
                'passwordUser' : passwordKiosk,
            },
            dataType: "json",
            success: function (response) {
                toast('Se ha registrado correctamente', 'is-info')
                /* Vaciar inputs y cerrar modal */
                modal.removeClass('is-active')
                var inputsAddModal = modal.find(".input")
                $.each(inputsAddModal, function(idx, el) {
                    el.value = ""
                });
                getKiosks()
            },
            error: function (error) {
                if(error.status == '401'){
                    sessionStorage.removeItem('token')
                    window.open("index.html",'_self');
                }
                if(error.status == '406'){
                    toast('No se pudo registrar el Kiosco, no se han procesado correctamente los datos', 'is-warning')
                }
                if(error.status == '500'){
                    toast('No se pudo registrar el Kiosco, Error interno del servidor', 'is-warning')
                }
            }
        });
    }
}

/* Función para validar que los datos ingresados están correctos */
function validationsAddKiosk(nameKiosk,userKiosk, passwordKiosk, cPasswordKiosk) {
    if (nameKiosk == '' || userKiosk == '' || passwordKiosk == '' || cPasswordKiosk == '') {
        toast('Completa los campos', 'is-warning')
        return false
    }

    var patt = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!patt.test(userKiosk)) {
        toast('El correo ingresado en "Correo (Usuario)" no es válido', 'is-warning')
        return false
    }
    if (userKiosk.length > 50) {
        toast('El correo ingresado en "Correo (Usuario)" no puede contener más de 50 caracteres', 'is-warning')
        return false
    }

    var pattPassword = /^(?=.*\d)(?=.*[!@#$&-.+,])(?=.*[A-Z])(?=.*[a-z])\S{8,45}$/
    if (!pattPassword.test(passwordKiosk)) {
        toast('La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un carácter no alfanumérico ! @ # $ & - . + ,', 'is-warning')
        return false
    }
    if (passwordKiosk != cPasswordKiosk) {
        toast('Las contraseñas ingresadas deben coincidir', 'is-warning')
        return false
    }
    return true
}

/* Función para obtener los usuarios ya registrados */
function getKiosks(){
    $.ajax({
        url: ip_server +
        "/logged/getAllKioscos",
        type: "POST",
        data:{
            'bearer' : sessionStorage.token,
        },
        dataType: "json",
        success: function (response) {
            
            const table=$("table").DataTable()
            var dataSet = response.kioscos;
            
            //Limpiar tabla
            table.clear()

            //insertar datos
            for (const kiosco of dataSet) {
                //<a class="button modal-button colorBlue" data-target="#modalAddUser">
                var iconContainer = "<a class='modal-button' data-target='#modalEditKiosk' style='color: #9696D4'><span class='icon'><i class='fas fa-lg fa-pen'></i></span></a>" + "<a href='#' class='modal-button' data-target='#modalDelKiosk' style='padding-left: 35px;color: #F74784' ><span class='icon'><i class='fas fa-lg fa-trash-alt'></i></span></a>";
                
                table.row.add([
                    kiosco.nameKiosco,
                    kiosco.nameUser,
                    iconContainer
                ])
                
            }
            
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