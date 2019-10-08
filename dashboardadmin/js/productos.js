//Importación de módulos
import { toast, modal, ip_server, setTable, loadFiles } from "./plugins.js"
/* toast options: is-info, is-success, is-warning, is-danger */
import { importModule } from "https://uupaa.github.io/dynamic-import-polyfill/importModule.js";

//Exportación de módulos
export { init }

/* Función para establecer eventos y datos iniciales */
function init() {
    
    $('#addProduct').click(function (e) {
        loadFiles("RegistrarProducto.html", "js/RegistrarProducto.js")
    });

    getCategories()
    getProducts()

    $("#delProd").click(deleteProduct);
    $('#updateProd').click(updateProduct);

    $('#searchProduct').click(function (e) {
        var cat = $('#searchCategory').val()
        var subcat = $('#searchSubCategory').val()
        
        if (cat != -1) {
            if (subcat != -1) {
                getProducts(cat, subcat)
            }
            else {
                getProducts(cat)
            }
        }
    });

    $('#searchCategory').change(function (e){
        const category = $('#searchCategory option:selected').val()
        if(category != -1) {
            getSubCategories(category);
        }
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

            setSelectProductCategories(response.categories)

        },
        error: function (error) {
            if(error.status == '401'){
                sessionStorage.removeItem('token')
            }
        }
    });
}

/* Función para agregar las categorias de productos al select */
function setSelectProductCategories(productCategories) {
    $.each(productCategories, function (key, value) {
        let option = document.createElement('option')
        option.textContent = value.nameCategory
        option.value = value.idCategory
        $('#searchCategory').append(option)
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

            setSelectProductSubCategories(response.subcategories)

        },
        error: function (error) {
            if(error.status == '401'){
                sessionStorage.removeItem('token')
            }
        }
    });
}

/* Función para agregar las subcategorias de productos al select  */
function setSelectProductSubCategories(productCategories, searchSubCategory) {
    $.each(productCategories, function (key, value) {
        let option = document.createElement('option')
        option.textContent = value.nameSubcategory
        option.value = value.idSubcategory
        $('#searchSubCategory').append(option)
    })
}




function getProducts(idCategory, idSubcategory) {
    var values = {
        'bearer': sessionStorage.token
    }
    if (idCategory && !idSubcategory) {
        values = {
            'bearer': sessionStorage.token,
            'idCategory': idCategory
        }
    } else if (idSubcategory){
        values = {
            'bearer': sessionStorage.token,
            'idSubcategory': idSubcategory
        }
    }
    
    var totalRecords = 0,
    records = [],
    displayRecords = [],
    recPerPage = 8,
    page = 1,
    totalPages = 0;
    $.ajax({
        type: "POST",
        url: ip_server + "/logged/getAllProducts",
        data: values,
        dataType: 'json',
        success: function (data) {
            $('#searchSubCategory').val(-1)
            
            var selectList = $("#searchSubCategory")
            selectList.find("option:gt(0)").remove()

            records = data.products;
            totalRecords = records.length;
            if (totalRecords > 0) {
                totalPages = Math.ceil(totalRecords / recPerPage);
                apply_pagination(totalPages,recPerPage, records,displayRecords);
            } else {
                $('#content').append('<center>No se encontró ningún Producto</center>');
            }

        }
    });
}

function deleteProduct(){
    var idProduct = $("#delProd").attr('data-p');
    $.ajax({
        url: ip_server +
        "/logged/deleteProduct",
        type: "POST",
        data:{
            'bearer' : sessionStorage.token,
            'idProduct' : idProduct
        },
        dataType: "json",
        success: function (response) {
            toast('Se ha eliminado el producto correctamente', 'is-info')
            modal.removeClass('is-active')
            $('#modalDelProduct').modal('hide');
        }
    });
}
function updateProduct(){

}

function apply_pagination(totalPages, recPerPage, records,displayRecords) {
    $('.pagination').twbsPagination('destroy');
    $('.pagination').twbsPagination({
        totalPages: totalPages,
        visiblePages: 5,
        first: 'Primera',
        prev: 'Anterior',
        next: 'Siguiente',
        last: 'Última',
        onPageClick: function (event, page) {
            var displayRecordsIndex = Math.max(page - 1, 0) * recPerPage;
            var endRec = (displayRecordsIndex) + recPerPage;

            displayRecords = records.slice(displayRecordsIndex, endRec);
            generate_rows(displayRecords);
        }
    });
}


function generate_rows(displayRecords) {
    
    var div = $('<div class="column">');
    var column1 = $('<div class="columns">');
    var column2 = $('<div class="columns">');
    var columnEmpty = $('<div class="column">');
    $('#content').html('');
    for (var i = 0; i < displayRecords.length; i++) {

        div = $('<div class="column">');

        div.append('<div class="image-flip" ontouchstart="this.classList.toggle("hover");">' +
                '<div class="mainflip">' +
                    '<div class="frontside">' +
                        '<div class="card">' +

                            '<header class="card-header">' +
                                '<p class="card-header-title">' + displayRecords[i].nameProduct + ' </p>' +
                            '</header>' +
                            '<div class="card-image">' +
                                '<figure class="image is-4by3">' +
                                    '<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">' +
                                '</figure>' +
                            '</div>' +
                            '<div class="card-content">' +
                                '<div class="content">' +
                                    '<div class="card-text"><strong>Categoría:</strong>' + displayRecords[i].nameCategory + '</div>' +
                                    '<div class="card-text" *ngIf="user.Rol==1"><strong>Descripción:</strong>' + displayRecords[i].featuresProduct + '</div>' +

                                    '<a href="#" style="color: #4AE0B8"><i class="fa fa-plus"></i></a>' + 
                                '</div>' + 
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="backside">' +
                        '<div class="card">' +
                            '<header class="card-header">' +
                                '<p class="card-header-title">' + displayRecords[i].nameProduct + '</p>' +
                            '</header>' +
                            '<div class="card-content text-center">' +
                                '<div class="content">' +
                                    '<div class="card-text"><strong>Categoría:</strong>' + displayRecords[i].nameCategory + '</div>' +
                                    '<div class="card-text"><strong>Subcategoría:</strong>' + displayRecords[i].nameSubcategory + '</div>' +
                                    '<div class="card-text" *ngIf="user.Rol==1"><strong>Descripción:</strong>' + displayRecords[i].featuresProduct + '</div>' +
                                    '<div class="card-text"><strong>Dimensiones:</strong>' + displayRecords[i].widthDimension + ' x ' + displayRecords[i].heightDimension + '</div>' +
                                    '<div class="card-text"><strong>Costo:</strong>' + displayRecords[i].publicPrice + '</div>' +
                                    '<div class="card-text">' +
                                        '<strong>Acciones:</strong> ' +
                                        '<div class="has-addons">' +
                                            '<a class=" button is-primary is-inverted modal-button updateProduct" data-target="#modalEditProduct" publicPrice="' + displayRecords[i].publicPrice + '" publicUtilityPrice="' + displayRecords[i].publicUtilityPrice + '" idDimension="' + displayRecords[i].idDimension + '" nameSubcategory="' + displayRecords[i].nameSubcategory + '" idSubcategory="' + displayRecords[i].idSubcategory + '" nameCategory="' + displayRecords[i].nameCategory + '" idCategory="' + displayRecords[i].idCategory + '" featuresProduct="' + displayRecords[i].featuresProduct + '" enableProduct="' + displayRecords[i].enableProduct + '" nameProduct="' + displayRecords[i].nameProduct + '" idProduct="' + displayRecords[i].idProduct + '"><span class="icon"><i class="fas fa-lg fa-pen"></i></span></a>' +

                                            '<a href="#" class=" button is-danger is-inverted modal-button deleteProduct"  data-target="#modalDelProduct" style="padding-left: 10px;" idProduct="' + displayRecords[i].idProduct + '><span class="icon"><i class="fas fa-lg fa-trash-alt"></i></span></a>');
                                                div.append('</div>');

                                            div.append('</div>');
                                        div.append('</div>');
                                    div.append('</div>');
                                div.append('</div>');
                        div.append('</div>');
                div.append('</div>');
            div.append('</div>');
        div.append('</div>');

        if (displayRecords.length < 4) {
            column1.append(div)
            if ((i == displayRecords.length - 1) && i < 4) {
                
                for (let index = i + 1; index < 4; index++) {
                    column1.append(columnEmpty.clone())
                }
            }
        } else {
            if (i < 4) {
                column1.append(div)
            } else {
                column2.append(div)
                if ((i == displayRecords.length - 1) && i < 8) {
                
                    for (let index = i + 1; index < 8; index++) {
                        column2.append(columnEmpty.clone())
                    }
                }
            }
        }

    }
    if (displayRecords.length <= 4) {
        $('#content').append(column1);
    } else {
        $('#content').append(column1);
        $('#content').append(column2);
    }
    modal()
    controlarClick();
}

function controlarClick() {
    $('.updateProduct').unbind();
    $('.updateProduct').on('click', function () {
        $("#editProd").attr('idProduct', $(this).attr('idProduct'));
    });

    $(".deleteProduct").click(function(e){
        $("#delProd").attr('idProduct', $(this).attr('idProduct'));
    });
}
