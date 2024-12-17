document.addEventListener('DOMContentLoaded', ()=>{

/*Differenzio lo slider in due tipologie:
- La prima è dedicata allo slider delle copertine
- la seconda tipologia agli slider-video presenti, in questo caso solo il primo, ma può essere replicato per più righe*/
let nextSlider = document.querySelector("#slider-container .next");
let previousSlider = document.querySelector("#slider-container .previous");
let nextSliderVideo = document.querySelector(".slider-video .next");
let previousSliderVideo = document.querySelector(".slider-video .previous");
    
/*GESTIONE SLIDER DI COPERTINA*/
nextSlider.addEventListener("click", ()=>{
    slideMoveNext();
    iconMoveNext();
});

previousSlider.addEventListener("click", ()=>{    
    slideReset();
    nextSlider.style.display="block";
    previousSlider.style.display="none";
});

/*GESTIONE SLIDER COPERTINE VIDEO*/
nextSliderVideo.addEventListener("click", ()=>{ 
    sliderVideoNext();
    setTimeout(()=>{previousSliderVideo.style.display="block";}, 1000);
    setTimeout(()=>{nextSliderVideo.style.display="none";}, 1000);
});

previousSliderVideo.addEventListener("click", ()=>{ 
    sliderVideoPrev();
    setTimeout(()=>{previousSliderVideo.style.display="none";}, 1000);
    setTimeout(()=>{nextSliderVideo.style.display="block";}, 1000);
});


}); /*end DOMContentLoaded*/

function sliderVideoNext(){
    let videoVisible = document.querySelector(".slider-video .card-container");
    videoVisible.style.translate="-100%";
    let nextVideos = document.querySelector(".slider-video .card-container.next");
    nextVideos.style.display="block";
    setTimeout(()=>{nextVideos.style.opacity="1";}, 10);
    setTimeout(()=>{nextVideos.style.translate="-100%"}, 10);
    videoVisible.style.opacity="0";
}

function sliderVideoPrev(){
    let videoVisible = document.querySelector(".slider-video .card-container");
    videoVisible.style.translate="none";
    let nextVideos = document.querySelector(".slider-video .card-container.next")
    nextVideos.style.translate="none";
    nextVideos.style.opacity="0";
    setTimeout(()=>{nextVideos.style.display="none"}, 1050);
    videoVisible.style.opacity="1";
}

function slideMoveNext(){
    document.querySelector("#slider-container .previous").style.display="block";
    let slideVisible = document.querySelector("#slider > .visible");
    let slideNext = document.querySelector("#slider > .next");
    slideVisible.classList.replace("visible" , "slide-previous");
    slideNext.classList.replace("next", "visible");
    let nextElement = slideNext.nextElementSibling;
    console.log(nextElement);
    if (nextElement != null){
        nextElement.classList.add("next");
    }
    else{
        document.querySelector("#slider-container .next").style.display ="none";
        slideNext.previousElementSibling.classList.replace("slide-previous", "next");
    }
}

function iconMoveNext(){
    let iconFocus = document.querySelector("#navigator .focus");
    let iconNext = document.querySelector("#navigator .nextChild")
    iconFocus.classList.remove("focus");
    iconNext.classList.replace("nextChild","focus");
    iconNext.nextElementSibling.classList.add("nextChild");
}

/*  ***VIGLIACCATA*** => Per non perdere troppo tempo sulla gestione dei movimenti inversi dello slider (dato che non richiesto), ho creato una funzione per resettare lo slider allo stato iniziale quando si clicca sull'iccona "Previous"*/
function slideReset(){
    let slider = document.getElementById("slider");
    slider.innerHTML=`
                <img src="../../multimedia/img/slider-1.webp" class="visible">
                <img src="../../multimedia/img/slider-2.webp" class="next">
                <img src="../../multimedia/img/slider-3.webp">
                <img src="../../multimedia/img/slider-4.webp">
                <img src="../../multimedia/img/slider-5.webp">
                <img src="../../multimedia/img/slider-6.webp">  
    `;

    let navigator = document.getElementById("navigator");
    navigator.innerHTML=`
                <li class="icon focus">g</li>
                <li class="icon nextChild">g</li>
                <li class="icon">g</li>
                <li class="icon">g</li>
                <li class="icon">g</li>
                <li class="icon">g</li>
    `
}