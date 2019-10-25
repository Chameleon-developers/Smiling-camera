//Importación de módulos
import { toast, modal, ip_server, setTable, loadFilesHomeCategory, loadFilesHomeSearch } from "./plugins.js"

//Exportación de módulos
export { init }

/* Función para establecer eventos y datos iniciales (idSubcategory e idCategory) */
function init(idProduct) {
    getInfoProduct(idProduct)
}

function getInfoProduct(idProduct) {
	$.ajax({
		type: "POST",
		url: /* ip_server */"http://localhost:3500" + "/getProductById",
		data: {
			'idProduct': idProduct, 
		},
		dataType: 'json',
		success: function (data) {

			console.log(data.products[0].imageProduct);
			$('#imageProd').attr('src','../dashboardadmin/uploads/' + data.products[0].imageProduct)
			$('#Descripcion').text(data.products[0].featuresProduct)

		},
		error: function (error) {
		}
	})
}