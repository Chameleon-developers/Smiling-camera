//Exportación de módulos
export { toast, modal }

/* Función para ejecutar un toast-notification */
function toast(msg, type) {
    let notifDiv = document.createElement('div')
    notifDiv.setAttribute('class', 'notification ' + type)
    notifDiv.appendChild(document.createTextNode(msg))
    let btn = document.createElement('button')
    btn.setAttribute('class', 'delete')
    notifDiv.appendChild(btn)
    $('.toast-container').append(notifDiv)
    $(btn).click(function(e) {
        notifDiv.classList.add('hidden')
        setTimeout(() => {
            notifDiv.remove()
        }, 300);
    })
    setTimeout(() => {
        $(notifDiv).addClass('hidden');
    }, 4000);
}

function modal() {
    document.querySelectorAll('.modal-button').forEach(function(e) {
        e.addEventListener('click', function() {
            var target = document.querySelector(e.getAttribute('data-target'));
            
            target.classList.add('is-active');

            target.querySelector('.delete').addEventListener('click',   function() {
                target.classList.remove('is-active');
            });
        });
    });
}