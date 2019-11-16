//Importación de módulos
import { toast, ip_server } from "./plugins.js"

//Exportación de módulos
export { init }

/* variable para total */
var total = 0

/* Función para establecer eventos y datos iniciales (idSubcategory e idCategory) */
function init() {
    getShop()

    $('#total').text(" $20.00")
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
            '<td style="width: 200px;"><img src="resources/LibroSINBOTON2.png" alt="img1"></td>' +
            '<td style="width: 20%;"><input id="cantidad" class="input" type="number" value="'+value.quantityShop+'" min="1"></td> ' +
            '<td>$'+value.publicPrice+'</td>' +
            '<td>$'+subtotal+'</td>' +
            '<td>' +
                '<div class="size12 trans-0-4 m-t-10 m-b-10 m-r-10">' +
                    '<a class="button is-primary" id="updateShop" name="button">Actualizar</a>' +
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