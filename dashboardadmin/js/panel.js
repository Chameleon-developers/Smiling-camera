import { importModule } from "https://uupaa.github.io/dynamic-import-polyfill/importModule.js";

/* Función para declarar eventos eventos */
$(function() {

    menu("usuarios")

    $("#Usuarios").click(function (e) {
        isActiveMenu(this)
        menu("usuarios")
    });

    $("#Productos").click(function (e){
        isActiveMenu(this)
        menu("productos")
    })


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
     case "productos":
        loadFiles("productos.html", "js/productos.js");
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