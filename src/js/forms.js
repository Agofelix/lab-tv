/*Gestione finestra LOGIN*/ 

document.addEventListener('DOMContentLoaded', ()=>{

let contactLink = document.getElementById("contact-link");

let registerNow = document.getElementById("register-now");
let formUser = document.forms["user"];
let formRegister = document.forms["register"];
let formContact = document.forms["contact"];

/*Apparizione del form contatti al click del link "Contatti"*/
contactLink.addEventListener('click', ()=>{
    formContact.style.display = "flex";
    formContact.style.opacity = "1";
})

/*Switch del form al click del link "Registrati subito"*/
registerNow.addEventListener('click', ()=>{
    changeScreen("Registrazione", "Compila i campi richiesti per creare un nuovo account", "none", "flex");
})
formUser.addEventListener("submit", submitUserControl);
formRegister.addEventListener("submit", submitRegisterControl);
formContact.addEventListener("submit", submitContact);


});//end-DOMContentLoaded

/*Controllo submit del form di accesso Utente*/
function submitUserControl(e){
    let formUser = document.forms["user"];
    e.preventDefault();
    if(isValidUser()){
        changeScreen("Benvenuto!", "stiamo accedendo alla tua area riservata", "none", "none");
        successReveal("Accesso riuscito!...");
        setTimeout(()=>{formUser.submit();}, 3000);
    }
    else{
        errorReveal("Uno o più dei campi richiesti non è stato inserito o non è valido!");
    }
}

/*Controllo submit del form di registrazione nuovo Utente*/
function submitRegisterControl(e){
    e.preventDefault();
    if(isValidRegister()){
        changeScreen("Grazie!", "Controlla la tua casella di posta per confermare la registrazione", "none", "none");
        successReveal("Registrazione effettuata con successo!");
        setTimeout(()=>{location.reload();}, 6000);
    }
    else{
        errorReveal("Uno o più dei campi richiesti non è stato inserito o non è valido!");
    }
}

/*Controllo submit del form Contatti*/
function submitContact(e){
    let formContact = document.forms["contact"];
    
    e.preventDefault();
    if(isValidContact()){
        formContact.submit();
    }
    else{ 
        // alert("Uno dei campi richiesti non è inserito o non è valido!");
        if((isValidName(formContact.elements["name"].value) == false) || (isValidName(formContact.elements["surname"].value) == false) ){
            contactError("Inserire Nome e Cognome validi");
        }
        else if(isValidTel(formContact.elements["tel"].value) == false){
            contactError("Inserire un numero di telefono valido");
        }
        else if(isValidEmail(formContact.elements["newemail3"].value) == false){
            contactError("Inserire un indirizzo email valido");
        }
        else{
            contactError("Uno dei campi richiesti non è inserito o non è valido!")
        }
    }
}

/*Funzione generica per la validazione del form di contatto.*/
function isValidContact(){
    let formContact = document.forms["contact"];
    let userName = formContact.elements["name"].value;
    let userSurname = formContact.elements["surname"].value;
    let userEmail = formContact.elements["newemail3"].value;
    let userTel = formContact.elements["tel"].value;
    return isValidName(userName) & isValidName(userSurname) & isValidEmail(userEmail) & isValidTel(userTel);
}

/*Funzione generica per la validazione del form di accesso.*/
function isValidUser(){
    let formUser = document.forms["user"];
    let userEmail = formUser.elements["email"].value;
    let userPassword = formUser.elements["password"].value;
    return isValidEmail(userEmail) & isValidPassword(userPassword);
}

/*Funzione generica per la validazione del form di registrazione, compresa l'uguaglianza delle password*/
function isValidRegister(){
    let formRegister = document.forms["register"];
    let userNewEmail = formRegister.elements["newemail"].value;
    let userNewPassword = formRegister.elements["newpassword"].value;
    let userNewPassword2 = formRegister.elements["newpassword2"].value;
    if(userNewPassword === userNewPassword2){
        return isValidEmail(userNewEmail) & isValidPassword(userNewPassword) & isValidPassword(userNewPassword2);
    }
}

/*funzione generica per il controllo del nome tramite regEX
massimo 15 caratteri alfabetici con Maiuscole e minuscole*/ 
function isValidName(elementValue){
    let namePattern = /^[A-Za-z]{1,15}$/ ;
    return namePattern.test(elementValue);
}

/*funzione generica per il controllo del numero di telefono tramite regEXP
numero telefonico di 10 cifre*/ 
function isValidTel(elementValue){
    let telPattern = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/ ;
    return telPattern.test(elementValue);
}

/*funzione generica per il controllo email tramite regEX
classico pattern Email, con @ e . */ 
function isValidEmail(elementValue){
    let charPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    return charPattern.test(elementValue);
}

/*funzione generica per il controllo della password tramite regEX
almeno 8 caratteri alfanumerici, non sono ammessi caratteri speciali*/ 
function isValidPassword(elementValue){
    let passPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ ;
    return passPattern.test(elementValue);
}

/*Funzione generica per il messaggio di errore al submit: 
Comodo per differenziare l'errore sui vari input*/ 
function errorReveal(message){
    let errorMSG = document.querySelector("div.error");
    errorMSG.style.bottom="50px";
    errorMSG.style.opacity="1";
    errorMSG.innerHTML= message;
}

/*Funzione generica per il messaggio di errore al submit del form di contatto*/ 
function contactError(message){
    let contactError = document.querySelector("#contatti p.msg");
    contactError.style.opacity="1";
    contactError.innerHTML= message;
}

/*Funzione generica per il messaggio di successo al submit*/ 
function successReveal(message){
    let errorMSG = document.querySelector("div.error");
    let spinLoader = document.querySelector(".spinner");
    errorMSG.style.bottom="50px";
    errorMSG.style.opacity="1";
    errorMSG.style.color="greenyellow";
    errorMSG.style.transition="500ms";
    errorMSG.innerHTML= message;
    spinLoader.style.display="block";
}

/*Funzione generica per il cambio dei contenuti dello schermo*/
function changeScreen(title, subtitle, displayLogin, displayRegister){
    let errorMSG = document.querySelector("div.error");
    let screenLogin = document.getElementById("login");
    let screenRegister = document.getElementById("new-account");
    let screenTitle = document.querySelector(".login-container h1");
    let subTitle = document.querySelector(".login-container p");
    screenLogin.style.display= displayLogin;
    screenRegister.style.display= displayRegister;
    screenTitle.innerHTML = title;
    subTitle.innerHTML= subtitle;
    errorMSG.innerHTML= "";
}
