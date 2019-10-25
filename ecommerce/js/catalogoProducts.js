//Importación de módulos
import { toast, modal, ip_server, setTable, loadFilesInfo } from "./plugins.js"

//Exportación de módulos
export { init, initS }

/* Función para establecer eventos y datos iniciales (idSubcategory e idCategory) */
function init(idSubcategory, idCategory) {
	getProducts(idCategory, idSubcategory)

	$("#products").on("click", ".infoProduct", function(e) { 
    	//console.log($(this).attr('data-product'))
    	loadFilesInfo("infoProducto.html", "js/infoProducto.js", $(this).attr('data-product'));
    });
}

/* Función para establecer eventos y datos iniciales (busqueda) */
function initS(search) {
	getProductsBySearch(search)

	$("#products").on("click", ".infoProduct", function(e) { 
    	//console.log($(this).attr('data-product'))
    	loadFilesInfo("infoProducto.html", "js/infoProducto.js", $(this).attr('data-product'));
    });
}

/* Funcion para obtener productos por busqueda */
function getProductsBySearch(search) {
	$.ajax({
	        type: "POST",
	        url: ip_server + "/getAllProducts",
	        data: {
	        	'search': search, 
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

/* Funcion para obtener productos por categorias y subcategoria */
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
	if(products.length != 0) { 
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
	                              	'<button id="selectProduct" data-product="' + value.idProduct + '" class="button is-danger infoProduct" style="width: 100%;">Comprar</button>' +
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
	else {
        $('#products').append('<center><div class="notification is-warning" style="width: 90%;"><center>No se encontró ningún producto, <strong>intente mas tarde</strong></div></center>');
	}
}