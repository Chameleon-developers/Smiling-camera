//Importación de módulos
import { toast, modal, ip_server, loadFilesUser } from "./plugins.js"

//Exportación de módulos
export { init }

/* Función para establecer eventos y datos iniciales (idSubcategory e idCategory) */
function init(idProduct) {
	getInfoProduct(idProduct)
	$('#cant').on('keyup', checkCant)
	$('#addCart').on('click', addCart)
	$('html, body').animate({scrollTop:0}, 'slow');
}

function getInfoProduct(idProduct) {
	$.ajax({
		type: "POST",
		url: ip_server + "/getProductById",
		data: {
			'idProduct': idProduct, 
		},
		dataType: 'json',
		success: function (data) {
			let features = ""
			$('#imageProd').attr('src','../dashboardadmin/uploads/' + data.products[0].imageProduct)
			$('#addCart').attr('data-Product',data.products[0].idProduct)
			$('#NameProduct').text(data.products[0].nameProduct)
			for (var key in data.products[0].featuresProduct.Caracteristicas) {
				features += key + ": "
				features += data.products[0].featuresProduct.Caracteristicas[key] + " \n"
			}

			$('#Descripcion').html(features)
			$('#Precio').text('$' + data.products[0].publicPrice)

		},
		error: function (error) {
		}
	})
}

/* Controlar valor de los inputs number */
function checkCant() {
	let max= parseInt(this.max);
	let min= parseInt(this.min);
	let valor = parseInt(this.value);
	if(valor>max){
		this.value = max;
	}
	if(valor<min){
		this.value = min;
	}

};

function addCart() {
	if (!sessionStorage.token) {
		loadFilesUser("signIn.html", "js/signIn.js")
		return null
	}
	var product = $(this).attr('data-Product');
	var cantidad = $('#cant').val();
	$.ajax({
		type: "POST",
		url: ip_server + "/logged/addDefaultShop",
		data: {
			'idProduct': product,
			'quantityShop': cantidad,
			'bearer': sessionStorage.token
		},
		dataType: 'json',
		success: function (data) {
			toast('Se ha agregado al carrito correctamente','is-info')
		},
		error: function (error) {
			if(error.status == '401'){
				toast('Necesita Iniciar Sesión nuevamente','is-danger')
				loadFilesUser("signIn.html", "js/signIn.js")
			}
			if(error.status == '500'){
				toast('Error Interno del Servidor','is-danger')
            }
		}
	})
}