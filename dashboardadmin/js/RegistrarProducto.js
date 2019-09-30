//Importación de módulos
/* toast options: is-info, is-success, is-warning, is-danger */
import { importModule } from "https://uupaa.github.io/dynamic-import-polyfill/importModule.js";

//Exportación de módulos
export { init }

/* Función para establecer eventos y datos iniciales */
function init() {
   
    $('#returnProduct').click(function (e){
        loadFiles("producto.html","producto.js")
    });
}
function loadFiles(htmlFile, jsFile) {

    $('#Content').load(htmlFile, function () {

        importModule(jsFile).then((module) => {
            module.init();
        });

    });
}