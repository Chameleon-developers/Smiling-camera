getProducts() 

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

function setToProduct(idProduct) {
	alert(idProduct)
}

/* Genera carrusel con los productos obtenidos*/
function setCarrucel(products) {
	var cont = 1
	$('.item-1').html('')
	$('.item-2').html('')
	$('.item-3').html('')

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

		}
		else if(cont>3 && cont<=6) {
			$('.item-2').append(div)
		}
		else {
			$('.item-3').append(div)
		}

		cont++
    })
}

