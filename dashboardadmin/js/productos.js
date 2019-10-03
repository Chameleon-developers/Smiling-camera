//Importación de módulos
import { toast, modal, ip_server, setTable } from "./plugins.js"
/* toast options: is-info, is-success, is-warning, is-danger */
import { importModule } from "https://uupaa.github.io/dynamic-import-polyfill/importModule.js";

//Exportación de módulos
export { init }

/* Función para establecer eventos y datos iniciales */
function init() {
    $('#addProduct').click(function (e){
        loadFiles("RegistrarProducto.html","js/RegistrarProducto.js")
    });

    $('#searchProduct').click(function (e){
        var cat= $('#searchCategory').value
        var subcat = $('#searchSubCategory').value
        if(cat != -1){
            if(subcat !=-1){
                searchCatSubcat(cat,subcat)
            }
            else {
                searchCat(cat)
            }
        }
    });
    
    getCategories()

    $('#searchCategory').change(function (e){
        var category = $('#searchCategory').value;
        if(category != -1) 
            getSubCategories($('#searchCategory').value);
        else{
            $('#searchCategory').empty()
        }
    });

}

/*This function will load the content of the dashboard */
function loadFiles(htmlFile, jsFile) {

    $('#Content').load(htmlFile, function () {

        importModule(jsFile).then((module) => {
            module.init();
        });

    });
}
/*This function will load and search the products that belongs those categories or subcategories */
function searchCatSubcat(idCategory, idSubcategory) {
    
}

/*This function will load and search the products that belongs that category */
function searchCat(idCategory) {
    
}

/* Función para consultar las categorias de productos que existen */
function getCategories() {
    $.ajax({
        type: "POST",
        url: ip_server + "/logged/getCategories",
        data: {
            'bearer' : sessionStorage.token,
        },
        dataType: "json",
        success: function (response) {

            setSelectProductCategories(response.categories, "searchCategory")

        },
        error: function (error) {
            if(error.status == '401'){
                sessionStorage.removeItem('token')
                window.open("index.html",'_self');
            }
        }
    });
}

/* Función para agregar las categorias de productos al select*/  
function setSelectProductCategories(productCategories,searchCategory) {
    $.each(productCategories, function (key, value) {
        let option = document.createElement('option')
        option.textContent = value.nameCategory.split(' ')[0]
        option.value = value.idCategory
        $('#'+searchCategory).append(option)
    })
}
/*--------------------------------------------------------------------------------------------------- 
/* Función para consultar las subcategorias de productos que existen */
function getSubCategories(idCategory) {
    $.ajax({
        type: "POST",
        url: ip_server + "/logged/getSubcategories",
        data: {
            'bearer' : sessionStorage.token,
            'idCategory': idCategory,
        },
        dataType: "json",
        success: function (response) {

            setSelectProductSubCategories(response.subcategories, "searchSubCategory")

        },
        error: function (error) {
            if(error.status == '401'){
                sessionStorage.removeItem('token')
                window.open("index.html",'_self');
            }
        }
    });
}

/* Función para agregar las subcategorias de productos al select  */
function setSelectProductSubCategories(productCategories,searchSubCategory) {
    $.each(productCategories, function (key, value) {
        let option = document.createElement('option')
        option.textContent = value.nameSubcategory.split(' ')[0]
        option.value = value.idSubcategory
        $('#'+searchSubCategory).append(option)
    })
}



/* Función para obtener los usuarios ya registrados */
function getUsers(){
    $.ajax({
        url: ip_server +
        "/logged/getUsers",
        type: "POST",
        data:{
            'bearer' : sessionStorage.token,
        },
        dataType: "json",
        success: function (response) {
            const table=$("#table").DataTable()
            var dataSet = response.users;
            var tipo = ""
            
            //Limpiar tabla
            table.clear()

            //insertar datos
            for (const usr of dataSet) {
                var iconContainer = "<a style='color: #9696D4'><span class='icon'><i class='fas fa-lg fa-pen'></i></span></a>" + "<a href='#' style='padding-left: 35px;color: #F74784' ><span class='icon'><i class='fas fa-lg fa-trash-alt'></i></span></a>";
                
                if (usr.idTypeUser == 1) {
                    tipo = "Administrador";
                } else {
                    tipo = "Operador";
                }

                table.row.add([
                    usr.nameUser,
                    usr.mainEmail,
                    tipo,
                    iconContainer
                ])
            }
            table.draw();
        },
        error: function (error) {
            if(error.status == '401'){
                sessionStorage.removeItem('token')
                window.open("index.html",'_self');
            }
        }
    });
}



/* Función para validar que los datos ingresados están correctos */
function validationsAddUser(mainEmail, resetEmail, nameUser, typeUser, passwordUser, cPasswordUser) {
    if (mainEmail == '' || resetEmail == '' || nameUser == '' || passwordUser == '' || cPasswordUser == '') {
        toast('Completa los campos', 'is-warning')
        return false
    }
    if (typeUser == 0) {
        toast('Selecciona un tipo de usuario', 'is-warning')
        return false
    }
    
    var pattMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!pattMail.test(mainEmail) && mainEmail.lenght < 50) {
        toast('El correo ingresado en "Correo (Usuario)" no es válido', 'is-warning')
        return false
    }
    if (!pattMail.test(resetEmail) && resetEmail.lenght < 50) {
        toast('El correo ingresado en "Correo para restablecer Contraseña" no es válido', 'is-warning')
        return false
    }
    if (mainEmail == resetEmail) {
        toast('Los correos ingresados deben ser diferentes', 'is-warning')
        return false
    }
    var pattPassword = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,45}$/
    if (!pattPassword.test(passwordUser)) {
        toast('La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un carácter no alfanumérico.', 'is-warning')
        return false
    }
    if (passwordUser != cPasswordUser) {
        toast('Las contraseñas ingresadas deben coincidir', 'is-warning')
        return false
    }
    return true
}


/*Funcion para paginar--------------------------------cargar()--------------------------------------------*/
$(function () {
	var totalRecords = 0,
	records = [],
	displayRecords = [],
	recPerPage = 8,
	page = 1,
	totalPages = 0;
	$.ajax({
			type: "POST", 
	      	data: {
                url: ip_server + "/logged/getProducts",
                'bearer' : sessionStorage.token,
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
	      $('#contentProducts').html('');
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
 
            div.append('<div class="column ">'+
                '<div class="image-flip" ontouchstart="this.classList.toggle("hover");">'+
                    '<div classcolumns="mainflip">'+
                        '<div class="frontside">'+
                            '<div class="card">'+
                              
                                '<header class="card-header">'+
                                    '<p class="card-header-title">'+displayRecords[i].nameProduct+' </p>'+
                                '</header>'+
                                '<div class="card-image">'+
                                   ' <figure class="image is-4by3">'+
                                      '<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">'+
                                    '</figure>'+
                                  '</div>'+
                                '<div class="card-content">'+
                                    '<div class="content">'+
                                        '<div class="card-text"><strong>Categoría:</strong>'+displayRecords[i].nameCategory  +'</div>'+
                                        '<div class="card-text" *ngIf="user.Rol==1"><strong>Descripción:</strong>'+displayRecords[i].featuresProduct + '</div>'+
                                      
                                      '<a href="#" style="color: #4AE0B8"><i class="fa fa-plus"></i></a>');
                                    div.append('</div>');
                                div.append('</div>');
                            div.append('</div>');
                        div.append('</div>');
                        div.append('<div class="backside">'+
                            '<div class="card">'+
                                '<header class="card-header">'+
                                    '<p class="card-header-title">'+displayRecords[i].nameProduct +'</p>'+
                                '</header>'+
                                '<div class="card-content text-center">'+
                                    '<div class="content">'+
                                            '<div class="card-text"><strong>Categoría:</strong>'+displayRecords[i].nameCategory  +'</div>'+
                                            '<div class="card-text"><strong>Subcategoría:</strong>'+displayRecords[i].nameSubcategory  +'</div>'+
                                            '<div class="card-text" *ngIf="user.Rol==1"><strong>Descripción:</strong>'+displayRecords[i].featuresProduct + '</div>'+
                                            '<div class="card-text"><strong>Dimensiones:</strong>'+displayRecords[i].widthDimension +' x '+displayRecords[i].heightDimension  +'</div>'+
                                            '<div class="card-text"><strong>Costo:</strong>'+displayRecords[i].publicPrice +'</div>'+
                                      '<div class="card-text">'+
                                        '<strong>Acciones:</strong> '+
                                        '<div class="has-addons">'+
                                            '<a class=" button is-primary is-inverted" ><span class="icon"><i class="fas fa-lg fa-pen"></i></span></a>'+
                                        
                                            '<a href="#" class=" button is-danger is-inverted" style="padding-left: 10px;"><span class="icon"><i class="fas fa-lg fa-trash-alt"></i></span></a>');
                                        div.append('</div>');
                                                
                                      div.append('</div>');
                                  div.append('</div>');
                                div.append('</div>');
                            div.append('</div>');
                        div.append('</div>');
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
