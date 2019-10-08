//Importación de módulos
import {loadFiles, toast, modal, ip_server } from "./plugins.js"
//Exportación de módulos
export { init }

/* Función para establecer eventos y datos iniciales */
function init() {
    //getCategories() 
    //getDimensiones()
    $('#returnKiosk').click(function (e){
        loadFiles("kioscos.html","js/kioscos.js")
    });

}