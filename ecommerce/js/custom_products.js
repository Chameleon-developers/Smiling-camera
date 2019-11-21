//Importación de módulos
import { toast, modal, ip_server, setTable, loadFilesHomeCategory } from "./plugins.js"

//Exportación de módulos
export { init, enviarImagen }

/*funcion de bulma */

$.ajax({
    type: "POST",
    url: ip_server + "/logged/getSubcategoriesEcommerce",
    data:{
        'bearer':sessionStorage.token,
        'idUser':sessionStorage.idUser
    },
    dataType:"json",
    success: function(response){
        $.each(response.subcategories, function(i, item) {
            if(i>=3)
            $('#selProducts').append("<option value='"+item.idSubcategory+"'>"+item.nameSubcategory+"</option>");
        });
    },error: function(error){

    }
});


/*
fetch(ip_server+'/logged/getSubcategoriesEcommerce', {
    method: 'POST',
    headers: {
        'bearer':sessionStorage.token,
        'idUser':sessionStorage.idToken}
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));*/

    var stage;
/* Función para establecer eventos y datos iniciales */
function init(idSubcategory, idCategory) {
    var bulma = new bulmaSteps(document.getElementById('stepsDemo'), {
        onShow: (id) => console.log(id),
        beforeNext:true,
    });
    

    console.log(bulma.options.beforeNext);
    /*
    $("#example-basic").steps({
        headerTag: "h3",
        bodyTag: "section",
        transitionEffect: "slideLeft",
        autoFocus: true
    });*/
    
    
    console.log(idSubcategory);
    console.log(idCategory);

    $('html, body').animate({scrollTop:0}, 'slow');
    
    // Input File
    const inputImage = document.querySelector('#image');
    // Nodo donde estará el editor
    const editor = document.querySelector('#editor');
    // El canvas donde se mostrará la previa
    const miCanvas = document.querySelector('#preview');
    // Contexto del canvas
    const contexto = miCanvas.getContext('2d');
    // Ruta de la imagen seleccionada
    let urlImage = undefined;
    // Evento disparado cuando se adjunte una imagen
    inputImage.addEventListener('change', abrirEditor, false);
    //Imagen de vista previa
    const vistaPrevia = document.querySelector('#vista-previa');
    
    
    /**
    * Método que abre el editor con la imagen seleccionada
    */
    function abrirEditor(e) {
        //revisamos que se haya cargado una imagen y ponemos como false la bandera
        bulma.options.beforeNext=false;
        // Obtiene la imagen
        urlImage = URL.createObjectURL(e.target.files[0]);
        //escribe el nombre de la imagen en el footer
        const fileName = document.querySelector('#nombre-archivo');
        fileName.textContent = e.target.files[0].name;
        
        vistaPrevia.setAttribute('src',urlImage);
        
        // Borra editor en caso que existiera una imagen previa
        editor.innerHTML = '';
        let cropprImg = document.createElement('img');
        cropprImg.setAttribute('id', 'croppr');
        
        editor.appendChild(cropprImg);

        // Limpia la previa en caso que existiera algún elemento previo
        
        contexto.clearRect(0, 0, miCanvas.width, miCanvas.height);

        // Envia la imagen al editor para su recorte
        document.querySelector('#croppr').setAttribute('src', urlImage);
       
        // Crea el editor
        new Croppr('#croppr', {
            aspectRatio: null,
            startSize: [100, 100],
            onCropEnd: recortarImagen
        })

        
    }

    /**
    * Método que recorta la imagen con las coordenadas proporcionadas con croppr.js
    */
    var filteredImageCanvas = document.getElementById("filtered-image");
    console.log(typeof filteredImageCanvas);

    function recortarImagen(data) {
        // Variables
        const inicioX = data.x;
        const inicioY = data.y;
        const nuevoAncho = data.width;
        const nuevaAltura = data.height;
        
        //var zoom;
        
        const zoom = 1;
        let imagenEn64 = '';
        let imagenFinal64 ='';
        // La imprimo
        miCanvas.width = nuevoAncho;
        miCanvas.height = nuevaAltura;
        // La declaro
        let miNuevaImagenTemp = new Image();
        // Cuando la imagen se carge se procederá al recorte
        miNuevaImagenTemp.onload = function() {
            
            // Se recorta
            contexto.drawImage(miNuevaImagenTemp, inicioX, inicioY, nuevoAncho * zoom, nuevaAltura * zoom, 0, 0, nuevoAncho, nuevaAltura);
            
            // Se transforma a base64
            imagenEn64 = miCanvas.toDataURL("image/jpeg");
            // Mostramos el código generado
            //document.querySelector('#base64').textContent = imagenEn64;
            
            var img = document.getElementById("imagen");
            img.innerHTML='<img id="original-image" class="image-canvas" src="'+imagenEn64+'"/>'; 

            //obtenemos la imagen base
            var originalImage = document.getElementById("original-image");
            console.log(typeof originalImage);
          
            //llenamos el carousel
            var filteredImage= document.getElementsByClassName("filtered-image-carousel");
            var imageUploaded = false;
            var reader;
            originalImage.onload = function(){
                console.log("Image Succesfully Loaded");
                imageUploaded = true;
                LenaJS.filterImage(filteredImage[0], LenaJS["none"], originalImage,160,90);
                LenaJS.filterImage(filteredImage[1], LenaJS["gaussian"], originalImage,160,90);
                LenaJS.filterImage(filteredImage[2], LenaJS["grayscale"], originalImage,160,90);
                //LenaJS.filterImage(filteredImage[3], LenaJS["invert"], originalImage,160,90);
                LenaJS.filterImage(filteredImage[3], LenaJS["saturation"], originalImage,160,90);
                LenaJS.filterImage(filteredImage[4], LenaJS["sepia"], originalImage,160,90);
                LenaJS.filterImage(filteredImage[5], LenaJS["sharpen"], originalImage,160,90);
                //LenaJS.filterImage(filteredImage[7], LenaJS["thresholding"], originalImage,160,90);
                LenaJS.filterImage(filteredImageCanvas, LenaJS['none'], originalImage,originalImage.width,originalImage.height);
                imagenFinal64 = filteredImageCanvas.toDataURL("image/jpeg");
                cargarEmoji(filteredImageCanvas.width,filteredImageCanvas.height,imagenFinal64);
                
            };
            //agregamos los eventos
            document.getElementById("filtro1").onclick = function(){
                LenaJS.filterImage(filteredImageCanvas, LenaJS['none'], originalImage,originalImage.width,originalImage.height);
                //generamos el nuevo base 64
                imagenFinal64 = filteredImageCanvas.toDataURL("image/jpeg");
                cargarEmoji(filteredImageCanvas.width,filteredImageCanvas.height,imagenFinal64);
                //this.attr('selected','selected');
                console.log(imagenFinal64)
            };
            document.getElementById("filtro2").onclick = function(){
                LenaJS.filterImage(filteredImageCanvas, LenaJS['gaussian'], originalImage,originalImage.width,originalImage.height);
                imagenFinal64 = filteredImageCanvas.toDataURL("image/jpeg");
                cargarEmoji(filteredImageCanvas.width,filteredImageCanvas.height,imagenFinal64);
                console.log(imagenFinal64)
            };
            document.getElementById("filtro3").onclick = function(){
                LenaJS.filterImage(filteredImageCanvas, LenaJS['grayscale'], originalImage,originalImage.width,originalImage.height);
                imagenFinal64 = filteredImageCanvas.toDataURL("image/jpeg");
                cargarEmoji(filteredImageCanvas.width,filteredImageCanvas.height,imagenFinal64);
                console.log(imagenFinal64)
            };
            document.getElementById("filtro4").onclick = function(){
                LenaJS.filterImage(filteredImageCanvas, LenaJS['saturation'], originalImage,originalImage.width,originalImage.height);
                imagenFinal64 = filteredImageCanvas.toDataURL("image/jpeg");
                cargarEmoji(filteredImageCanvas.width,filteredImageCanvas.height,imagenFinal64);
                console.log(imagenFinal64)
            };
            document.getElementById("filtro5").onclick = function(){
                LenaJS.filterImage(filteredImageCanvas, LenaJS['sepia'], originalImage,originalImage.width,originalImage.height);
                imagenFinal64 = filteredImageCanvas.toDataURL("image/jpeg");
                cargarEmoji(filteredImageCanvas.width,filteredImageCanvas.height,imagenFinal64);
                console.log(imagenFinal64)
            };
            document.getElementById("filtro6").onclick = function(){
                LenaJS.filterImage(filteredImageCanvas, LenaJS['sharpen'], originalImage,originalImage.width,originalImage.height);
                imagenFinal64 = filteredImageCanvas.toDataURL("image/jpeg");
                cargarEmoji(filteredImageCanvas.width,filteredImageCanvas.height,imagenFinal64);
                console.log(imagenFinal64)
            };
            
            
            //document.querySelector('#base64HTML').textContent = '<img src="' + imagenEn64.slice(0, 40) + '...">';            
            //var width = window.innerWidth;
            //var height = window.innerHeight;
            
        }
        // Proporciona la imagen cruda, sin editarla por ahora
        miNuevaImagenTemp.src = urlImage;
        

    }
    cargarEmojis();

    var boton = document.getElementById("enviar-foto");
    boton.addEventListener("click", function(){
        enviarImagen();
        
    }, false);
}

var layer;
var fondoObj = new Image();
function cargarEmoji(w,h,imagenFinal64){
    var width = w;
    var height = h;
    /*var ratio = w/h;
    if(w<350){
        width = w;
    }else if(h<350){
        height = h;
    }else{
        width = 350*ratio;
        height= 350*ratio;
    }*/

    stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height,
        id: 'final',
        name: 'imgf'
    });

    layer = new Konva.Layer();

    
    fondoObj.onload = function() {
        var fondo = new Konva.Image({
        x: 0,
        y: 0,
        image: fondoObj,
        width: width,
        height: height,
        draggable: false
        });

        // add the shape to the layer
        layer.add(fondo);
        layer.batchDraw();
    };
    
    fondoObj.src = imagenFinal64;

    stage.add(layer);
        
    
}




function cargarEmojis (){
    var emojisTable = document.getElementsByClassName("emojis-table");

    for(let i=0;i<emojisTable.length;i++){
        emojisTable[i].onclick = function (){
            console.log("emoji");
            var imagen = new Image();
            imagen = this;
            var em = new Konva.Image({
                x: 0,
                y: 0,
                image: imagen,
                width: 64,
                height: 64,
                draggable: true
            });
            layer.add(em);
            layer.batchDraw();
            console.log(document.getElementsByTagName("canvas")[2].toDataURL("image/png"));
        }
    }
    
}



function enviarImagen(){
    var dataURL = stage.toDataURL({
        mimeType: 'image/png',
        quality: 1
    });

    console.log(dataURL);
    var select = document.getElementById("selProducts").value;
    console.log(select);
    $.ajax({
        type: "POST",
        url: ip_server + "/logged/addShop",
        data:{
            'bearer':sessionStorage.token,
            'image':dataURL
            
        },
        dataType:"json",
        success: function(response){
            
        },error: function(error){
    
        }
    });
}