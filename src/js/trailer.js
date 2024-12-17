/*Gestione eventi trailer*/ 

document.addEventListener('DOMContentLoaded', ()=>{
   
    audioButton = document.querySelectorAll("div.icon.audio");
    let videoCards = document.querySelectorAll("div.card");

/*Creo un addEventlistener utilizzando forEach per applicarlo ad ogni card indistintamente*/    
    videoCards.forEach(item => {
        let thisVideo = item.firstElementChild.firstElementChild; /*seleziono l'elemento video di ogni card*/ 
        if(thisVideo.tagName=="VIDEO"){ /*se l'elemento video selezionato è un elemento video html allora applico la funzione -- implementato per fixare le card senza video*/
            item.addEventListener("mouseover", ()=>{
                thisVideo.style.display="block";
                thisVideo.play();  
            })
            item.addEventListener("mouseleave", ()=>{       
                if(thisVideo.style.display="none"){
                    thisVideo.pause();
                }   
            })    
        }
    })

    audioButton.forEach(item => {
        item.addEventListener("click", ()=>{

            audioManager(); /*FACOLTATIVO MIO: creo funzione iterativa con ciclo for per gestire l'audio come la piattaforma originale */ 

            /*Qui l'audio Manager si applicherebbe solo al trailer selezionato*/ 
            // let thisVideo = item.previousElementSibling;
            // if(thisVideo.muted){
            //     thisVideo.muted =false;
            //     item.innerHTML="v";
            // }
            // else{
            //     thisVideo.muted=true;
            //     item.innerHTML="m";
            // }
                
        })       
    })

});//end-DOMContentLoaded
       
function audioManager() {
    let allVideos = document.querySelectorAll("video");
    for(i=0; i<= allVideos.length; i++){
        if(allVideos[i].muted){
            allVideos[i].muted = false;
            allVideos[i].nextElementSibling.innerHTML="v";
        } else {
            allVideos[i].muted = true;
            allVideos[i].nextElementSibling.innerHTML="m";
        }
    } 
}

