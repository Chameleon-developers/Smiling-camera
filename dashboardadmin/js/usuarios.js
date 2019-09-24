const ip_server = 'http://' + document.domain + ':3500'

//Exportación de módulos
export { init }

//Importación de módulos
import { toast} from "./panel.js"

function init() {
    getUsers()

    document.querySelectorAll('.modal-button').forEach(function(el) {
        el.addEventListener('click', function() {
            var target = document.querySelector(el.getAttribute('data-target'));
            
            target.classList.add('is-active');

            target.querySelector('.delete').addEventListener('click',   function() {
                target.classList.remove('is-active');
            });
        });
    });
}

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
            var dataSet = response.users;

            var i = 0;
            $.each(dataSet, function (key, value) {
                var tipo;
                if (dataSet[i].idTypeUser == 1) {
                tipo = "Administrador";
                } else {
                tipo = "Operador";
                }
                $("#users").append("<tr><th>" + dataSet[i].nameUser + "</th>" +
                "<td>" + dataSet[i].mainEmail + "</td>" +
                "<td>" + tipo + "</td>" +

                "<td>" + "<a style='color: #9696D4'><span class='icon'><i class='fas fa-lg fa-pen'></i></span></a>" + "<a style='padding-left: 35px;color: #F74784'><span class='icon'><i class='fas fa-lg fa-trash-alt'></i></span></a>" + "</td>" +
                "</tr>")
                i++;
            });
            $("#table").DataTable({
                "oLanguage": {
                    "sEmptyTable": "No existe información para mostrar",
                    "sSearch": "",
                    "oPaginate": {
                        "sNext":       "Siguiente",
                        "sPrevious":   "Anterior"
                    },
                    "sInfoEmpty":      "0 de 0",
                    "sSearchPlaceholder": "BUSCAR",
                    "sInfo": "Mostrando _START_-_END_ de _TOTAL_",
                    "sLengthMenu": '<span>Filas mostradas: </span><select class="browser-default">' +
                        '<option value="10">5</option>' +
                        '<option value="20">10</option>' +
                        '<option value="30">15</option>' +
                        '<option value="30">20</option>' +
                        '<option value="30">25</option>' +
                        '</select></div>'
                }
            });
        }
    });
}
