//Importación de módulos
import {loadFiles, toast, modal, ip_server } from "./plugins.js"
//Exportación de módulos
export { init }

/* Función para establecer eventos y datos iniciales */
function init() {
    getCategories() 
    getDimensiones()
    $('#returnProduct').click(function (e){
       /* $('#addProductCategories')[0].reset();
        $('#addproductSubCategories')[0].reset();
        $('#productname')[0].reset();
        $('#addProductDimensions')[0].reset();
        $('#productcost')[0].reset();
        $('#productpic')[0].reset();
        $('#productcaract')[0].reset();*/
        loadFiles("productos.html","js/productos.js")
    });/*
    $('#addProductCategories').onChange(function (e){
        getSubCategories($('#addProductCategories').value);
    });
*/
  //  console.log($('#stepsAddProduct').is-completed;
}
/*$('#stepsAddProduct').options.beforeNext(function(step_id){
        switch( step_id ) {
            case 1:
              // DO YOUR VALIDATION FOR FIRST STEP (steps_id start at 0)
            if($('#addProductCategories').value == -1)
                $('#nextStep').disabled;
            else
                $('#nextStep').enabled;
              break;
            case 2:
              // DO YOUR VALIDATION FOR 2nd step
              break;
            case 2:
              // DO YOUR VALIDATION FOR 3rd STEP 
              break;
        }    
    });
}

/*
var stepsWizard = new StepsWizard(document.getElementById("stepsDemo"), {
    'beforeNext': function( step_id ) {
      switch( step_id ) {
        case 0:
          // DO YOUR VALIDATION FOR FIRST STEP (steps_id start at 0)
          break;
        case 1:
          // DO YOUR VALIDATION FOR 2nd step
          break;
        case 2:
          // DO YOUR VALIDATION FOR 3rd STEP 
          break;
          
          
        }
    }
  } );*/




/* Función para consultar las categorias de productos que existen 
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

/* Función para agregar las categorias de productos al select  
function setSelectProductCategories(productCategories) {
    $.each(productCategories, function (key, value) {
        let option = document.createElement('option')
        option.textContent = value.nameCategory.split(' ')[0]
        option.value = value.idCategory
        $('#addProductCategories').append(option)
    })
}
/*--------------------------------------------------------------------------------------------------- 
/* Función para consultar las subcategorias de productos que existen 
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
                window.open("index.html",'_self');
            }
        }
    });
}

/* Función para agregar las subcategorias de productos al select  
function setSelectProductSubCategories(productCategories) {
    $.each(productCategories, function (key, value) {
        let option = document.createElement('option')
        option.textContent = value.nameSubcategory.split(' ')[0]
        option.value = value.idSubcategory
        $('#addProductSubCategories').append(option)
    })
}

/*--------------------------------------------------------------------------------------------------- 
/* Función para consultar las dimensiones de productos que existen 
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

/* Función para agregar las categorias de productos al select  
function setSelectProductDimensions(productDimensions) {
    $.each(productDimensions, function (key, value) {
        let option = document.createElement('option')
        option.textContent = value.widthDimension.split(' ')[0] +" X " + value.heightDimension.split(' ')[0] /*ESTO SE PUEDE???? 
        option.value = value.idDimension
        $('#addProductDimensions').append(option)
    })
}
*/