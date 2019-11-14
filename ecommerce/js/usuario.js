//Importación de módulos
import { toast, modal, ip_server, setTable, loadFilesInfo } from "./plugins.js"

//Exportación de módulos
export { init }

/* Función para establecer eventos y datos iniciales (idSubcategory e idCategory) */
function init() {
    $(".logOut").click(function (e) {
		e.preventDefault()
		logOut()
	});
}

/* Funcion para cerrar sesion */
function logOut() {
    $('#logIn').css('display', 'flex')
    $('#usuario').css('display', 'none')
    sessionStorage.removeItem('token')
    window.location.assign("http://" + window.location.hostname+"/Smiling-camera/ecommerce/");
}




