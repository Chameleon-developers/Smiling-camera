//Importación de módulos
import { toast, modal, ip_server, setTable, loadFilesHomeCategory } from "./plugins.js"

//Exportación de módulos
export { init }

/* Función para establecer eventos y datos iniciales */
function init(idSubcategory, idCategory) {

    $("#example-basic").steps({
        headerTag: "h3",
        bodyTag: "section",
        transitionEffect: "slideLeft",
        autoFocus: true
    });
    
    console.log(idSubcategory);
    console.log(idCategory);
    
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
   
    /**
    * Método que abre el editor con la imagen seleccionada
    */
    function abrirEditor(e) {
        // Obtiene la imagen
        urlImage = URL.createObjectURL(e.target.files[0]);
        //escribe el nombre de la imagen en el footer
        const fileName = document.querySelector('#nombre-archivo');
        fileName.textContent = e.target.files[0].name;
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
            aspectRatio: 1,
            startSize: [70, 70],
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
            img.innerHTML='<img id="original-image" src="'+imagenEn64+'"/>'; 

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
                
            };
            //agregamos los eventos
            document.getElementById("filtro1").onclick = function(){
                LenaJS.filterImage(filteredImageCanvas, LenaJS['none'], originalImage,originalImage.width,originalImage.height);
                //generamos el nuevo base 64
                imagenFinal64 = filteredImageCanvas.toDataURL("image/jpeg");
                //this.attr('selected','selected');
                console.log(imagenFinal64)
            };
            document.getElementById("filtro2").onclick = function(){
                LenaJS.filterImage(filteredImageCanvas, LenaJS['gaussian'], originalImage,originalImage.width,originalImage.height);
                imagenFinal64 = filteredImageCanvas.toDataURL("image/jpeg");
                console.log(imagenFinal64)
            };
            document.getElementById("filtro3").onclick = function(){
                LenaJS.filterImage(filteredImageCanvas, LenaJS['grayscale'], originalImage,originalImage.width,originalImage.height);
                imagenFinal64 = filteredImageCanvas.toDataURL("image/jpeg");
                console.log(imagenFinal64)
            };
            document.getElementById("filtro4").onclick = function(){
                LenaJS.filterImage(filteredImageCanvas, LenaJS['saturation'], originalImage,originalImage.width,originalImage.height);
                imagenFinal64 = filteredImageCanvas.toDataURL("image/jpeg");
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
                console.log(imagenFinal64)
            };
            
            
            //document.querySelector('#base64HTML').textContent = '<img src="' + imagenEn64.slice(0, 40) + '...">';            
            //var width = window.innerWidth;
            //var height = window.innerHeight;
            
        }
        // Proporciona la imagen cruda, sin editarla por ahora
        miNuevaImagenTemp.src = urlImage;
        

    }

}
function cargarEmoji(w,h,imagenFinal64){
    var width = w;
    var height = h;


    var stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height
    });

    var layer = new Konva.Layer();
    var rectX = stage.width() / 2 - 50;
    var rectY = stage.height() / 2 - 25;

    var box = new Konva.Rect({
        x: rectX,
        y: rectY,
        width: 100,
        height: 50,
        fill: '#00D2FF',
        stroke: 'black',
        strokeWidth: 4,
        draggable: true
    });

    var fondoObj = new Image();
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
        //layer.batchDraw();
    };
    console.log("base64"+imagenFinal64);
    fondoObj.src = imagenFinal64;


    var imageObj = new Image();
    imageObj.onload = function() {
        var yoda = new Konva.Image({
        x: 100,
        y: 100,
        image: imageObj,
        width: 64,
        height: 64,
        draggable: true
        });

        // add the shape to the layer
        layer.add(yoda);
        //layer.batchDraw();
    };
    imageObj.src = 'emoji-data/img-apple-64/1f600.png';

    
    // add cursor styling
    box.on('mouseover', function() {
        document.body.style.cursor = 'pointer';
    });
    box.on('mouseout', function() {
        document.body.style.cursor = 'default';
    });

    layer.add(box);
    stage.add(layer);
}