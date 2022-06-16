var loader = document.querySelector(".loader");
var content = document.querySelector(".content");

window.addEventListener("load", sessionLoadPage);

//Sleep
function Sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

//PageLoader
async function sessionLoadPage() {
  if(sessionStorage.getItem("pageHasLightmode", true)) onModemenuKlick(); //looking for lightmode

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
var modemenu = document.querySelector(".cardmode");
var bg = document.querySelector(".background");
var lnk = document.querySelector(".navlink.lnk1");
var lnk1 = document.querySelector(".navlink.lnk2");
var cards = document.querySelector(".card.cardpw");
var cards1 = document.querySelector(".card.cardmode");
var cards2 = document.querySelector(".card.usercard");
var username = document.querySelector(".username");
var mail = document.querySelector(".mail");
var pw = document.querySelector(".pw");
var pwrep = document.querySelector(".pw-rep");

function onModemenuKlick(){
  if(modemenu.classList.contains("open")) sessionStorage.setItem("pageHasLightmode", true); //lightmode
  else if(!modemenu.classList.contains("open")) sessionStorage.removeItem("pageHasLightmode") //Darkmode
  
  modemenu.classList.toggle("open");
  body.classList.toggle("body-light");
  bg.classList.toggle("background-light");
  cards1.classList.toggle("card-light");

  if(cards2 == null){
    lnk.classList.toggle("lnk-light");
    lnk1.classList.toggle("lnk-light");
    cards.classList.toggle("card-light");
    mail.classList.toggle("mail-light");
    pw.classList.toggle("pw-light");
  }

  if(username != null){
    username.classList.toggle("username-light");
    pwrep.classList.toggle("pw-rep-light");
  }

  if(cards2 != null) cards2.classList.toggle("card-light"); //null bei nicht user
}

function onModemenuKlickUser(){
  if(modemenu.classList.contains("open")) sessionStorage.setItem("pageHasLightmode", true); //lightmode
  else if(!modemenu.classList.contains("open")) sessionStorage.removeItem("pageHasLightmode") //Darkmode
  
  modemenu.classList.toggle("open");
  body.classList.toggle("body-light");
  bg.classList.toggle("background-light");
  cards1.classList.toggle("card-light");
  cards2.classList.toggle("card-light");
}
