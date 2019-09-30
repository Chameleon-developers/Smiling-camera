//Importación de módulos
import { loadFiles } from "./plugins.js"

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

    $(".is-active").removeClass("is-active")
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