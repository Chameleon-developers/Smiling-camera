//Importación de módulos
import {loadFiles, toast, modal, ip_server } from "./plugins.js"
//Exportación de módulos
export { init }
//Variable para guardar productos
var tmpProducts;
var producthabil = 0;

/* Función para establecer eventos y datos iniciales */
function init() {
    getCategories()

    $('#returnProduct').click(function (e){
        loadFiles("productos.html","js/productos.js")
    });

    var form = $("#example-advanced-form").show();
 
    form.steps({
        headerTag: "h2",
        bodyTag: "fieldset",
        transitionEffect: "slideLeft",
        onStepChanging: function (event, currentIndex, newIndex)
        {
            // Allways allow previous action even if the current form is not valid!
            if (currentIndex > newIndex)
            {
                return true;
            }
            if (currentIndex == 0 && ($("#addProductCategories option:selected").val() == -1))
            {
                toast('Selecciona una categoria', 'is-warning')
                return false;
            }
            if (currentIndex == 1 && ($("#addProductSubCategories option:selected").val() == -1))
            {
                toast('Selecciona una subcategoria', 'is-warning')
                return false;
            }
            // Needed in some cases if the user went back (clean up)
            if (currentIndex < newIndex)
            {
                // To remove error styles
                form.find(".body:eq(" + newIndex + ") label.error").remove();
                form.find(".body:eq(" + newIndex + ") .error").removeClass("error");
            }
            form.validate().settings.ignore = ":disabled,:hidden";
            return form.valid();
        },
        onFinishing: function (event, currentIndex)
        {
            form.validate().settings.ignore = ":disabled";
            return form.valid();
        },
        onFinished: function (event, currentIndex)
        {
            addProduct()
        }
    });

    $('#addProductCategories').change(function (e){
        const category = $('#addProductCategories option:selected').val()
        if(category != -1) {
            getSubCategories(category);
        }
    });

    $('#addProductSubCategories').change(function (e){
        const category = $('#addProductSubCategories option:selected').val()
        if(category != -1) {
            getProducts();
        }
    });

    $('#addProduct').change(function (e){
        const idProduct = $('#addProduct option:selected').val()
        if(idProduct != -1) {
            setProductInformation(idProduct);
        }
        else {
            $('#productid').val(null);
            $('#productname').val(null);
            $('#productprice').val(null);
        }
    });

    $('#producthabil').change(function (e){
        if(this.checked) {
            producthabil = 1;
        }
        else {
            producthabil = 0;
        }
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
            }
        }
    });
}

/* Función para agregar las categorias de productos al select */
function setSelectProductCategories(productCategories) {
    $('#addProductCategories option[value!="-1"]').remove();
    $.each(productCategories, function (key, value) {
        let option = document.createElement('option')
        option.textContent = value.nameCategory
        option.value = value.idCategory
        $('#addProductCategories').append(option)
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

/* Función para agregar las subcategorias de productos al select */
function setSelectProductSubCategories(productSubcategories) {
    $('#addProductSubCategories option[value!="-1"]').remove();
    $.each(productSubcategories, function (key, value) {
        let option = document.createElement('option')
        option.textContent = value.nameSubcategory
        option.value = value.idSubcategory
        $('#addProductSubCategories').append(option)
    })
}
/*--------------------------------------------------------------------------------------------------- 
/* Función para obtener los usuarios ya registrados */
function getProducts(){
    const idCategory = $('#addProductCategories option:selected').val()
    const idSubcategory = $('#addProductSubCategories option:selected').val()

    $.ajax({
        url: ip_server + "/logged/getProducts",
        type: "POST",
        data:{
            'bearer' : sessionStorage.token,
            'idCategory' : idCategory,
            'idSubcategory' : idSubcategory,
        },
        dataType: "json",
        success: function (response) {
            tmpProducts = response.products

            setSelectProduct(tmpProducts);
        },
        error: function (error) {
            if(error.status == '401'){
                sessionStorage.removeItem('token')
                window.open("index.html",'_self');
            }
        }
    });
}

/* Función para agregar las subcategorias de productos al select */
function setSelectProduct(tmpProducts) {
    $('#addProduct option[value!="-1"]').remove();
    $.each(tmpProducts, function (key, value) {
        let option = document.createElement('option')
        option.textContent = value.nameProduct
        option.value = value.idProduct
        $('#addProduct').append(option)
    })
}
/*--------------------------------------------------------------------------------------------------- 
/* Funcion para cargar informacion de producto */
function setProductInformation(idProduct) {
    $.each(tmpProducts, function (key, value) {
        if(value.idProduct == idProduct) {
            $('#productid').val(value.idProduct);
            $('#productname').val(value.nameProduct);
            $('#productprice').val(value.publicPrice);
        }
    })
}


/*--------------------------------------------------------------------------------------------------- 
/* Función para agregar un nuevo usuario */
function addProduct() {
    const category = $('#addProductCategories option:selected').val()
    const subcategory = $('#addProductSubCategories option:selected').val()
    const nameProduct = $('#productname').val()
    const idproduct = $('#productid').val()

    if(validationsAddProduct(idproduct)) {
        const form_data = new FormData()
        form_data.append('image', $('#productpic')[0].files[0])
        form_data.append('idCategory', category)
        form_data.append('idSubcategory', subcategory)
        form_data.append('nameProduct', nameProduct)
        form_data.append('idProduct', idproduct)
        form_data.append('enabledProduct', producthabil)

        $.ajax({
            type: "POST",
            url: ip_server + "/insertProduct",
            data: form_data,
            contentType : false,
            processData: false,
            dataType: "json",
            success: function (response) {
                toast('Se ha registrado correctamente', 'is-info')
                loadFiles("productos.html","js/productos.js")
            },
            error: function (error) {
                if(error.status == '401'){
                    sessionStorage.removeItem('token')
                }
                if(error.status == '406'){
                    toast('No se pudo registrar el producto, no se han procesado correctamente los datos', 'is-warning')
                }
                if(error.status == '406'){
                    toast('No se pudo registrar el uproducto, Error interno del servidor', 'is-warning')
                }
            }
        });
    }
}

/* Función para validar que los datos ingresados están correctos */
function validationsAddProduct(idProduct, imageProduct) {
    if(idProduct == -1) {
        toast('Selecciona un producto', 'is-warning')
        return false;
    }

    return true
}