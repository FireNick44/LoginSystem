var loader = document.querySelector(".loader");
var content = document.querySelector(".content");

window.addEventListener("load", sessionLoadPage);

//Sleep
function Sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

//PageLoader
async function sessionLoadPage() {
  if(sessionStorage.getItem("pageHasLightmode", true)) themeMenu(); //looking for lightmode

  if(!sessionStorage.getItem("pageWasLoaded")) {
      loader.classList.add("appear");
      await Sleep(3000);
      loader.classList.add("disappear");
      await Sleep(100);
      content.classList.add("appear");
      sessionStorage.setItem("pageWasLoaded", true);
  }
  else if (sessionStorage.getItem("pageWasLoaded")) {
      await Sleep(1000);
      loader.classList.add("disappear");
      await Sleep(100);
      content.classList.add("appear");
  }
}

//Darkmode & Lightmode
var body = document.body;
var modemenu = document.querySelector(".modeCard");
var bg = document.querySelector(".background");
var lnk = document.querySelector(".navlink.link1");
var link1 = document.querySelector(".navlink.link2");
var cards = document.querySelector(".card.passwordCard");
var cards1 = document.querySelector(".card.modeCard");
var cards2 = document.querySelector(".card.userCard");
var username = document.querySelector(".username");
var mail = document.querySelector(".mail");
var pw = document.querySelector(".pw");
var pwrep = document.querySelector(".pwConfirm");

function themeMenu(){
  if(modemenu.classList.contains("open")) sessionStorage.setItem("pageHasLightmode", true); //lightmode
  else if(!modemenu.classList.contains("open")) sessionStorage.removeItem("pageHasLightmode") //Darkmode
  
  modemenu.classList.toggle("open");
  body.classList.toggle("bodyLight");
  bg.classList.toggle("backgroundLight");
  cards1.classList.toggle("cardLight");

  if(cards2 == null){
    lnk.classList.toggle("linkLight");
    link1.classList.toggle("linkLight");
    cards.classList.toggle("cardLight");
    mail.classList.toggle("mailLight");
    pw.classList.toggle("pwLight");
  }

  if(username != null){
    username.classList.toggle("usernameLight");
    pwrep.classList.toggle("pwConfirmLight");
  }

  if(cards2 != null) cards2.classList.toggle("cardLight"); //null bei nicht user
}

function themeMenuUser(){
  if(modemenu.classList.contains("open")) sessionStorage.setItem("pageHasLightmode", true); //lightmode
  else if(!modemenu.classList.contains("open")) sessionStorage.removeItem("pageHasLightmode") //Darkmode
  
  modemenu.classList.toggle("open");
  body.classList.toggle("bodyLight");
  bg.classList.toggle("backgroundLight");
  cards1.classList.toggle("cardLight");
  cards2.classList.toggle("cardLight");
}
