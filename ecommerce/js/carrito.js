//Importación de módulos
import { modal, toast, ip_server, getNumberShop } from "./plugins.js"

//Exportación de módulos
export { init }

/* variable para total */
var total = 0

/* Función para establecer eventos y datos iniciales (idSubcategory e idCategory) */
function init() {
    getShop()

    $('#total').text(" $20.00")

    $('#tablaCarrito').on('change', '.cantidad', function(e) {
        e.preventDefault()
        updatePrices($(this).attr('data-shop'))
    })
} 

/* Funcion para obtener carrito */
function getShop() {
    $.ajax({
        type: "POST",
        url: ip_server + "/logged/getShop",
        data: {
            'bearer': sessionStorage.token,
        },
        dataType: "json",
        success: function (response) {    
            
            agregaTabla(response.shop)

        },
        error: function (error) {
            if(error.status == '500'){
                toast('No se pudo consultar carrito, Error interno del servidor', 'is-danger')
            }
        }
    })
}

/* Funcion para llenar tabla de carrito */
function agregaTabla(shop) {
    total = 0;

    $.each(shop, function (key, value) {
        var tr = $('<tr>')
        var subtotal = value.publicPrice*value.quantityShop

        tr.append('<td>'+value.nameProduct+'</td>' +
            '<td style="width: 200px;"><img src="./uploads/'+value.zipNameShop +'" alt="Imagen de producto"></td>' +
            '<td style="width: 20%;"><input class="cantidad" id="cantidad'+value.idShop+'" class="input" type="number" value="'+value.quantityShop+'" min="1" data-shop="'+value.idShop+'"></td> ' +
            '<td id="precio'+value.idShop+'">$'+value.publicPrice+'</td>' +
            '<td id="subtotal'+value.idShop+'">$'+subtotal+'</td>' +
            '<td>' +
                '<div class="size12 trans-0-4 m-t-10 m-b-10 m-r-10">' +
                    '<a href="#" class=" button is-danger is-inverted modal-button updateShop" data-target="#modalUpdShop"style="padding-left: 10px;" data-shop="'+value.idShop+'"><span class="icon"><i class="fas fa-lg fa-save"></i></span></a>' +
                    '<a href="#" class=" button is-danger is-inverted modal-button deleteShop" data-target="#modalDelShop" style="padding-left: 10px;" data-shop="'+value.idShop+'"><span class="icon"><i class="fas fa-lg fa-trash-alt"></i></span></a>' +
                '</div>' +
            '</td>')

        total +=subtotal;

        $('#tablaCarrito').append(tr)
    })

    var pago = $('<tr><td colspan="6">' +
                '<div class="size12 trans-0-4 m-t-10 m-b-10 m-r-10" style="text-align: right;">' +
                    '<a class="button is-primary" name="button">Comprar</a>' +
                '</div>' +
            '</td></tr>')
    $('#tablaCarrito').append(pago)

    $('#total').text(' $' + total)
}

/* Funcion para actualizar precios */
function updatePrices(idShop) {
    let precio = $('#precio'+idShop).text().trim().substring(1)
    let cant = $('#cantidad'+idShop).val()
    let subtotalTemp = $('#subtotal'+idShop).text().trim(1).substring(1)
    var total = $('#total').text().trim().substring(1)
    
    total -= subtotalTemp

    var subtotal = precio*cant
    $('#subtotal'+idShop).text()
    $('#subtotal'+idShop).text('$'+subtotal)

    total += subtotal
    $('#total').text(' $' + total)
}

/* Funcion para eliminar producto de carrito */
function deleteShop() {
    $.ajax({
        type: "POST",
        url: ip_server + "/logged/deleteShop",
        data: {
            'bearer': sessionStorage.token,
            'idShop': idShop,
        },
        dataType: "json",
        success: function (response) {    
            
            toast('Producto eliminado de carrito correctamente', 'is-info')
            getNumberShop();

        },
        error: function (error) {
            if(error.status == '500'){
                toast('No se pudo eliminar producto de carrito, Error interno del servidor', 'is-danger')
            }
        }
    })
}

/* Funcion para actualizar producto de carrito */
function updateShop() {
    let quantityShop = $('#cantidad'+idShop).val()

    $.ajax({
        type: "POST",
        url: ip_server + "/logged/updateShop",
        data: {
            'bearer': sessionStorage.token,
            'idShop': idShop,
            'quantityShop': quantityShop,
        },
        dataType: "json",
        success: function (response) {    
            
            toast('Producto actualizado correctamente', 'is-info')
            getNumberShop();

        },
        error: function (error) {
            if(error.status == '500'){
                toast('No se pudo actualizar carrito, Error interno del servidor', 'is-danger')
            }
        }
    })
}