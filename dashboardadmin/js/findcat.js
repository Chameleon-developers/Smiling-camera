$(function () {
	var cat = sessionStorage.getItem('Cat')
	var url = ''
	if(cat != null){
        url = 'access/searchCat.php'
    }
    else{
        url = 'access/search.php'
        cat = sessionStorage.getItem('buscar')
    }
	var totalRecords = 0,
	records = [],
	displayRecords = [],
	recPerPage = 8,
	page = 1,
	totalPages = 0;
	$.ajax({
			type: "POST",
	      	url: url,
	      	data: {
                'cat' : cat
            },
	      	dataType: 'json',
	      	success: function (data) {
	                records = data;
	                totalRecords = records.length;
	                if (totalRecords>0) {
	                	totalPages = Math.ceil(totalRecords / recPerPage);
	                	apply_pagination();
	                }else{
	                	$('#content').append('<center>No se encontró ningun Producto</center>');
	                }
	                
	      }
	});

	function apply_pagination() {
	      $('.pagination').twbsPagination({
	            totalPages: totalPages,
	            visiblePages: 5,
	            onPageClick: function (event, page) {
	                  displayRecordsIndex = Math.max(page - 1, 0) * recPerPage;
	                  endRec = (displayRecordsIndex) + recPerPage;
	                 
	                  displayRecords = records.slice(displayRecordsIndex, endRec);
	                  generate_rows();
	            }
	      });
	}


	function generate_rows() {
	      var div;
	      $('#content').html('');
	      for (var i = 0; i < displayRecords.length; i++) {
	            div = $('<div class="col-md-3 col-sm-6">');
	            div.append('<div class="single-shop-product">');
	            
	            div.append('<div class="product-upper" style="margin: 0 auto">');
	            div.append('<a id="img' + displayRecords[i].idProducto + '"  class="sendProducto" style="width: 193px;height: 243px" itemprop="' + displayRecords[i].idProducto + '" href="#"><img src="imagenes/' + displayRecords[i].imagen + '" alt=""></a>');
	            div.append('</div>');

	            div.append('<h2><a id="text' + displayRecords[i].idProducto + '" class="sendProducto" itemprop="' + displayRecords[i].idProducto + '" href="#">' + displayRecords[i].nombre + '</a></h2>');

	            div.append('<div class="product-carousel-price">');
	            div.append('<ins style="text-decoration: none;margin-right: 5px;">$' + displayRecords[i].precio + '</ins>');
	            div.append('</div>');

	            div.append('</div>');
	            div.append('</div>');

	            $('#content').append(div);
	            
	      }
	      controlarClick();
	}

	function controlarClick() {
	    $('.sendProducto').unbind();
	    $('.sendProducto').on('click', function(){
	        var send = document.getElementById(this.id).getAttribute('itemprop');
	        sessionStorage.setItem('idProd', send);
        	window.open('single-product.html','_self');
	    });
	}
});