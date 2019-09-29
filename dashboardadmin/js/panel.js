import { importModule } from "https://uupaa.github.io/dynamic-import-polyfill/importModule.js";

//Exportación de módulos
export { toast }

/* Función para declarar eventos eventos */
$(function() {

    menu("usuarios")

    $("#Usuarios").click(function (e) {
        isActiveMenu(this)
        menu("usuarios")
    });

})

/* Función para agregar la clase is-active a una opción del menú */
function isActiveMenu(element) {

    $(".active").removeClass("active")
    $(element).addClass("is-active");
    
}

/* Función para saber que html y js cargar */
function menu(page) {
    
    switch (page) {
      case "usuarios":
        loadFiles("usuarios.html", "js/usuarios.js");
        break;
    }
}

/* Función para cargar los archivos html y js */
function loadFiles(htmlFile, jsFile) {

    $('#Content').load(htmlFile, function () {

        importModule(jsFile).then((module) => {
            module.init();
        });

    });
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