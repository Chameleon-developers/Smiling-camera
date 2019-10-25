//Importación de módulos
import { toast, modal, ip_server, setTable, loadFilesHomeCategory } from "./plugins.js"

//Exportación de módulos
export { init }

/* Función para establecer eventos y datos iniciales */
function init(idSubcategory, idCategory) {
	getProducts(idCategory, idSubcategory)
}

function getProducts(idCategory, idSubcategory) {
	$.ajax({
	        type: "POST",
	        url: ip_server + "/getAllProducts",
	        data: {
	        	'idCategory': idCategory,
	        	'idSubcategory': idSubcategory, 
	        },
	        dataType: 'json',
	        success: function (data) {


    			$('#products').html('');	        	
	        	setProducts(data.products)

	        },
	        error: function (error) {
	        }
	    })
}

/* Funcion para cargar productos */
function setProducts(products) {
	var cont = 0
	var contColumns = cont/4
	$.each(products, function (key, value) {
		if(cont%4 == 0) {
			if(cont != 0) {
				contColumns = cont/4
			}
		}

		var columns = $('<div class="columns" id="columns'+contColumns+'">')
		var column = $('<div class="column is-one-quarter">')
		
		column.append('<div class="card">' +
                      	'<div class="card-image">' +
                        	'<figure class="image is-4by3">' +
                          		'<img src="../dashboardadmin/uploads/' + value.imageProduct + '" height="10px" alt="Placeholder image">' +
                        	'</figure>' +
                      	'</div>' +
                        '<div class="card-content">' +
                            '<div class="content">' +
                              	'<p><span class="titPCaroussel" id="titP1">' + value.nameProduct + '</span><br><span class="costPCaroussel">$' + value.publicPrice + '</span></p>' +
                              	'<button class="button is-danger" style="width: 100%;">Comprar</button>' +
                            '</div>' +
                        '</div>' +
                    '</div>')


		if(cont%4 == 0) {
			columns.append(column)
			$('#products').append(columns)
		}
		else {
			$('#columns'+contColumns).append(column)
		}

		cont++
	})
}