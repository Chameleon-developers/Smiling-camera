//Exportación de módulos
export { 
    toast, 
    modal, 
    ip_server, 
    setTable,
    loadFilesHomeCategory
}

import { importModule } from "https://uupaa.github.io/dynamic-import-polyfill/importModule.js";

const ip_server = 'http://' + document.domain + ':3500'

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

function modal() {
    document.querySelectorAll('.modal-button').forEach(function(e) {
        e.addEventListener('click', function() {
            var target = document.querySelector(e.getAttribute('data-target'));
            target.classList.add('modal-active');

            target.querySelector('.delete').addEventListener('click',   function() {
                target.classList.remove('modal-active');
                target.querySelectorAll(".input").forEach(
                    elemento => elemento.value = ""
                );
            });

            target.querySelector('.deleteBtn').addEventListener('click',   function() {
                target.classList.remove('modal-active');
                target.querySelectorAll(".input").forEach(
                    elemento => elemento.value = ""
                );
            });

            target.querySelector('.modal-background').addEventListener('click',   function() {
                target.classList.remove('modal-active');
                target.querySelectorAll(".input").forEach(
                    elemento => elemento.value = ""
                );
            });
        });
    });
}

/* Establecer estructura y texts de la tabla */
function setTable(nameTable) {
    $.fn.dataTableExt.sErrMode = 'throw'
    $("#" + nameTable).DataTable({
        "oLanguage": {
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "No existe información para mostrar",
            "sSearch": "",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "Anterior"
            },
            "sInfoEmpty":      "0 de 0",
            "sSearch": "Buscar en tabla:",
            "sSearchPlaceholder": "BUSCAR",
            "sInfo": "Mostrando _START_-_END_ de _TOTAL_",
            "sLengthMenu": '<span>Filas mostradas: </span><select class="browser-default">' +
                '<option value="10">5</option>' +
                '<option value="20">10</option>' +
                '<option value="30">15</option>' +
                '<option value="30">20</option>' +
                '<option value="30">25</option>' +
                '</select></div>'
        }
    });
}

/* Función para cargar los archivos html y js */
function loadFilesHomeCategory(htmlFile, jsFile, idSubcategory, idCategory) {

    $('#Content').load(htmlFile, function () {

        importModule(jsFile).then((module) => {
            module.init(idSubcategory, idCategory);
        });

    });
}