//Importación de módulos
import { loadFiles } from "./plugins.js"

/* Función para declarar eventos eventos */
$(function() {

    menu("usuarios")

    $(".logOut").click(function (e) {
        sessionStorage.removeItem('token')
        window.location.assign("http://" + window.location.hostname+"/Smiling-camera/dashboardadmin/index.html");
    });

    $("#Usuarios").click(function (e) {
        isActiveMenu(this)
        menu("usuarios")
    });

    $("#Productos").click(function (e){
        isActiveMenu(this)
        menu("productos")
    })

    $("#Kioscos").click(function (e){
        isActiveMenu(this)
        menu("kioscos")
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
    case "kioscos":
        loadFiles("kioscos.html", "js/kioscos.js");
        break;
    }
} 

