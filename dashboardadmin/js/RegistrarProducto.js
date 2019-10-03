//Importación de módulos
import { toast, modal, ip_server, setTable, loadFiles } from "./plugins.js"

//Exportación de módulos
export { init }

/* Función para establecer eventos y datos iniciales */
function init() {
    getCategories() 
    getSubCategories() 
    getDimensiones()
    $('#returnProduct').click(function (e){
        loadFiles("productos.html", "js/productos.js");
    });
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
                window.open("index.html",'_self');
            }
        }
    });
}

/* Función para agregar las categorias de productos al select  */
function setSelectProductCategories(productCategories) {
    $.each(productCategories, function (key, value) {
        let option = document.createElement('option')
        option.textContent = value.nameCategory.split(' ')[0]
        option.value = value.idCategory
        $('#addProductCategories').append(option)
    })
}
/*---------------------------------------------------------------------------------------------------*/ 
/* Función para consultar las subcategorias de productos que existen */
function getSubCategories() {
    $.ajax({
        type: "POST",
        url: ip_server + "/logged/getSubcategories",
        data: {
            'bearer' : sessionStorage.token,
        },
        dataType: "json",
        success: function (response) {

            setSelectProductSubCategories(response.subcategories)

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
function setSelectProductSubCategories(productCategories) {
    $.each(productCategories, function (key, value) {
        let option = document.createElement('option')
        option.textContent = value.nameSubcategory.split(' ')[0]
        option.value = value.idSubcategory
        $('#addProductSubCategories').append(option)
    })
}

/*---------------------------------------------------------------------------------------------------*/ 
/* Función para consultar las dimensiones de productos que existen */
function getDimensiones() {
    $.ajax({
        type: "POST",
        url: ip_server + "/logged/getDimensions",
        data: {
            'bearer' : sessionStorage.token,
        },
        dataType: "json",
        success: function (response) {

            setSelectProductDimensions(response.dimensions)

        },
        error: function (error) {
            if(error.status == '401'){
                sessionStorage.removeItem('token')
                window.open("index.html",'_self');
            }
        }
    });
}

/* Función para agregar las categorias de productos al select  */
function setSelectProductDimensions(productDimensions) {
    $.each(productDimensions, function (key, value) {
        let option = document.createElement('option')
        option.textContent = value.widthDimension.split(' ')[0] +" X " + value.heightDimension.split(' ')[0] /*ESTO SE PUEDE???? */
        option.value = value.idDimension
        $('#addProductDimensions').append(option)
    })
}