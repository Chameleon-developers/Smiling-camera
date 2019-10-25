//Importación de módulos
import { toast, modal, ip_server, setTable, loadFilesHomeCategory } from "./plugins.js"

//Exportación de módulos
export { init }

/* Función para establecer eventos y datos iniciales */
function init(idSubcategory, idCategory) {
	getProducts(idCategory, idSubcategory)

	$(".Subcategory").click(function (e) {
		e.preventDefault()
		getProducts($(this).attr('data-Subcategory'), $(this).attr('data-Category'))
    });
}

function getProducts(idCategory, idSubcategory) {
	if (idCategory == 0) {
		window.location.assign("http://" + window.location.hostname+"/Smiling-camera/ecommerce/");
	} else {
		$.ajax({
	        type: "POST",
	        url: ip_server + "/getAllProducts",
	        data: {
	        	'idCategory': idCategory,
	        	'idSubcategory': idSubcategory, 
	        },
	        dataType: 'json',
	        success: function (data) {
	        	console.log(data.products)

	        },
	        error: function (error) {
	        }
	    })
	}
}