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
                LenaJS.filterImage(filteredImage[3], LenaJS["invert"], originalImage,160,90);
                LenaJS.filterImage(filteredImage[4], LenaJS["saturation"], originalImage,160,90);
                LenaJS.filterImage(filteredImage[5], LenaJS["sepia"], originalImage,160,90);
                LenaJS.filterImage(filteredImage[6], LenaJS["sharpen"], originalImage,160,90);
                LenaJS.filterImage(filteredImage[7], LenaJS["thresholding"], originalImage,160,90);
                $('.multiple-items').slick({
                    infinite: true,
                    slidesToShow: 4,
                    slidesToScroll: 4
                });
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
                LenaJS.filterImage(filteredImageCanvas, LenaJS['invert'], originalImage,originalImage.width,originalImage.height);
                imagenFinal64 = filteredImageCanvas.toDataURL("image/jpeg");
                console.log(imagenEn64)
            };
            document.getElementById("filtro5").onclick = function(){
                LenaJS.filterImage(filteredImageCanvas, LenaJS['saturation'], originalImage,originalImage.width,originalImage.height);
                imagenFinal64 = filteredImageCanvas.toDataURL("image/jpeg");

                console.log(imagenEn64)
            };
            document.getElementById("filtro6").onclick = function(){
                LenaJS.filterImage(filteredImageCanvas, LenaJS['sepia'], originalImage,originalImage.width,originalImage.height);
                imagenFinal64 = filteredImageCanvas.toDataURL("image/jpeg");
                console.log(imagenEn64)
            };
            document.getElementById("filtro7").onclick = function(){
                LenaJS.filterImage(filteredImageCanvas, LenaJS['sharpen'], originalImage,originalImage.width,originalImage.height);
                imagenFinal64 = filteredImageCanvas.toDataURL("image/jpeg");
                console.log(imagenEn64)
            };
            document.getElementById("filtro8").onclick = function(){
                LenaJS.filterImage(filteredImageCanvas, LenaJS['thresholding'], originalImage,originalImage.width,originalImage.height);
                imagenFinal64 = filteredImageCanvas.toDataURL("image/jpeg");
                console.log(imagenEn64)
            };
            //document.querySelector('#base64HTML').textContent = '<img src="' + imagenEn64.slice(0, 40) + '...">';            
        
        }
        // Proporciona la imagen cruda, sin editarla por ahora
        miNuevaImagenTemp.src = urlImage;
    }

}