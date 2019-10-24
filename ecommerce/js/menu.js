//Importación de módulos
import { loadFiles } from "./plugins.js"

/* Función para declarar eventos eventos */
$(function() {
	getProducts()

	$(".Subcategory").click(function (e) {
		e.preventDefault()
		getSubcategory($(this).attr('data-Subcategory'))
    });
})

/* Función para saber que html y js cargar */
function getSubcategory(idSubcategory) {
	if (idSubcategory == 0) {
		window.location.assign("http://" + window.location.hostname+"/Smiling-camera/ecommerce/index.html");
	} else {
		loadFiles("custom_products.html", "js/custom_products.js", idSubcategory);
	}

} 


/* Obtener productos para carrucel */
function getProducts() {
	$.ajax({
        type: "POST",
        url: /*ip_server*/ "http://localhost:3500" + "/getProductsRandom",
        data: {
            //'bearer' : sessionStorage.token,
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

/* Genera carrusel con los productos obtenidos*/
function setCarrucel(products) {
	var cont = 1
	$('.item-1').html('')
	$('.item-2').html('')
	$('.item-3').html('')

	let slides = 0
	$.each(products, function (key, value) {
		var div = $('<div class="column">')

		div.append('<div class="card">' +
                      	'<div class="card-image">' +
                        	'<figure class="image is-4by3">' +
                          		'<img src="../dashboardadmin/uploads/' + value.imageProduct + '" height="10px" alt="Placeholder image">' +
                        	'</figure>' +
                      	'</div>' +
                        '<div class="card-content">' +
                            '<div class="content">' +
                              	'<p><span class="titPCaroussel" id="titP1">' + value.nameProduct + '</span><br><span class="costPCaroussel">$' + value.publicPrice + '</span></p>' +
                              	'<button class="button is-danger">Personalizar</button>' +
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
		slidesToShow: 1,
		pagination: false,
		effect: 'fade',
		loop: true
	  });
}

