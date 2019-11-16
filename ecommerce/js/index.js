//Importación de módulos
import { loadFilesHomeCategory, loadFilesHomeSearch, loadFilesInfo, loadFilesUser, ip_server } from "./plugins.js"

/* Función para declarar eventos eventos */
$(function() {

	if (sessionStorage.token) {
		$('#logIn').css('display', 'none')
		$('#usuario').css('display', 'flex')
		$('#usuario').attr('data-user', "'" + sessionStorage.idUser + "'")
	}
	getProducts()

	$(".Customizable").click(function (e) {
		e.preventDefault()
		coutomizableProduct($(this).attr('data-Subcategory'), $(this).attr('data-Category'))
    });

    $(".Subcategory").click(function (e) {
		e.preventDefault()
		catalogoProducts($(this).attr('data-Subcategory'), $(this).attr('data-Category'))
	});
	
	$('#inputSearch').keypress(function (e) {
        if(e.keyCode == 13) $('#search').click()
    });

    $('#search').click(function (e) {
    	var search = $('#inputSearch').val()
    	if (search.length != 0) {
			loadFilesHomeSearch("catalogoProducts.html", "js/catalogoProducts.js", search);
		}
	});

	$('#logIn').click(function (e) {
		loadFilesUser("signIn.html", "js/signIn.js")
	})
	
	$('#usuario').click(function (e) {
		loadFilesUser("panel_usuario.html", "js/usuario.js");	
    });

    $("#secondPartPromotion").on("click", ".infoProduct", function(e) { 
    	loadFilesInfo("infoProducto.html", "js/infoProducto.js", $(this).attr('data-product'));
	});
	
	$("#carrito").click(function (e) {
		loadFilesUser("carrito.html", "js/carrito.js")
	});
})

/* Función para saber que html y js cargar */
function coutomizableProduct(idSubcategory, idCategory) {
	if (idCategory == 0) {
		window.location.assign("http://" + window.location.hostname+"/Smiling-camera/ecommerce/");
	} else {
		loadFilesHomeCategory("custom_products.html", "js/custom_products.js", idSubcategory, idCategory);
	}
} 

/* Funcion para cargar catalogo de productos */
function catalogoProducts(idSubcategory, idCategory) {
	if (idCategory == 0) {
		window.location.assign("http://" + window.location.hostname+"/Smiling-camera/ecommerce/");
	} else {
		loadFilesHomeCategory("catalogoProducts.html", "js/catalogoProducts.js", idSubcategory, idCategory);
	}
}

/* Obtener productos para carrucel */
function getProducts() {
	if (sessionStorage.token) {
		$.ajax({
			type: "POST",
			url: ip_server + "/logged/getProductsRandom",
			data: {
				'bearer' : sessionStorage.token,
			},
			dataType: "json",
			success: function (response) {
	
				setCarrucel(response.products)
	
			},
			error: function (error) {
				if(error.status == '401'){
					sessionStorage.removeItem('token')
				}
			}
		});
	}
	else {
		$.ajax({
			type: "POST",
			url: ip_server + "/getProductsRandom",
			dataType: "json",
			success: function (response) {
	
				setCarrucel(response.products)
	
			},
			error: function (error) {
				if(error.status == '401'){
					sessionStorage.removeItem('token')
				}
			}
		});
	}
}

/* Genera carrusel con los productos obtenidos*/
function setCarrucel(products) {
	var cont = 1
	$('.item-1').html('')
	$('.item-2').html('')
	$('.item-3').html('')

	let slides = 0
	$.each(products, function (key, value) {
		var div = $('<div class="column is-one-third">')

		div.append('<div class="card">' +
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

		
		if(cont<=3) {
			$('.item-1').append(div)
			slides = 1
		}
		else if(cont>3 && cont<=6) {
			$('.item-2').append(div)
			slides = 2
		}
		else {
			$('.item-3').append(div)
			slides = 3
		}

		cont++
	})
	if (slides == 1) {
		$('.item-2').remove()
		$('.item-3').remove()
	} else if(slides == 2) {
		$('.item-3').remove()
	}
	
	bulmaCarousel.attach('.hero-carousel', {
		slidesToScroll: 1,
		slidesToShow: slides,
		pagination: false,
		effect: 'fade',
		loop: true,
		autoplay: true,
		autoplaySpeed: 10000
	  });
}

