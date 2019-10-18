//Importación de módulos
import { loadFiles } from "./plugins.js"

/* Función para declarar eventos eventos */
$(function() {

    menu("usuarios")
    getCategories()
    getProducts()

    $(".logOut").click(function (e) {
        sessionStorage.removeItem('token')
        window.location.assign("http://" + window.location.hostname+"/Smiling-camera/dashboardadmin/index.html");
    });

    $("#Usuarios").click(function (e) {
        isActiveMenu(this)
        menu("usuarios")
    });

    $("#Productos").click(function (e){
        isActiveMenu(this)
        menu("productos")
    })

    $("#Kioscos").click(function (e){
        isActiveMenu(this)
        menu("kioscos")
    })

})

/* Función para agregar la clase is-active a una opción del menú */
function isActiveMenu(element) {

    $(".is-active").removeClass("is-active")
    $(element).addClass("is-active");

}

/* Función para saber que html y js cargar */
function menu(page) {
    
    switch (page) {
      case "usuarios":
      //  loadFiles("usuarios.html", "js/usuarios.js");
        break;
     case "productos":
      //  loadFiles("productos.html", "js/productos.js");
        break;
    case "kioscos":
      //  loadFiles("kioscos.html", "js/kioscos.js");
        break;
    }
} 

//***********************************************
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
                window.location.assign("http://" + window.location.hostname+"/Smiling-camera/ecommerce/menu.html");
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
                window.location.assign("http://" + window.location.hostname+"/Smiling-camera/ecommerce/menu.html");
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


