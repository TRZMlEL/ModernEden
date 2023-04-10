//---------------------------Odbieranie danych-------------------------------

var socket = io();

socket.on('wilgotnoscPW', function(wilgotnoscPW) {
    document.getElementById('wilgotnoscPW').innerHTML = wilgotnoscPW+'%'; 
});

socket.on('temperaturaPW', function(temperaturaPW) {
    document.getElementById('temperaturaPW').innerHTML = temperaturaPW+'°C'; 
});

socket.on('swiatlo', function(swiatlo) {
    if (swiatlo == "0"){
        document.getElementById('swiatlo').innerHTML = "zgaszone";
    }
    if (swiatlo == "1"){
        document.getElementById('swiatlo').innerHTML = "zapalone UV";
    }
});

socket.on('stan_okna', function(stan_okna) {
    if (stan_okna == "0"){
        document.getElementById('stan_okna').innerHTML = "zamkniete";
    }
    if (stan_okna == "1"){
        document.getElementById('stan_okna').innerHTML = "otwarte";
    }
});

socket.on('ProcentowaWilgotnoscGlebyS1', function(ProcentowaWilgotnoscGlebyS1) {
    document.getElementById('ProcentowaWilgotnoscGlebyS1').innerHTML = ProcentowaWilgotnoscGlebyS1+'%'; 
});

socket.on('ProcentowaWilgotnoscGlebyS2', function(ProcentowaWilgotnoscGlebyS2) {
    document.getElementById('ProcentowaWilgotnoscGlebyS2').innerHTML = ProcentowaWilgotnoscGlebyS2+'%'; 
});

socket.on('StanDeszczu', function(StanDeszczu) {
    if (StanDeszczu == "0"){
        document.getElementById('StanDeszczu').innerHTML = "deszcz";
    }
    if (StanDeszczu == "1"){
        document.getElementById('StanDeszczu').innerHTML = "zagrożenie deszczem";
    }
    if (StanDeszczu == "2"){
        document.getElementById('StanDeszczu').innerHTML = "nie pada";
    }
});

socket.on('CisnieniePZ', function(CisnieniePZ) {
    document.getElementById('CisnieniePZ').innerHTML = CisnieniePZ+'Pa'; 
});

socket.on('temperaturaPZ', function(temperaturaPZ) {
    document.getElementById('temperaturaPZ').innerHTML = temperaturaPZ+'°C'; 
});

socket.on('Wysokosc', function(Wysokosc) {
    document.getElementById('Wysokosc').innerHTML = Wysokosc+'m'; 
});

socket.on('RzeczywistaWysokosc', function(RzeczywistaWysokosc) {
    document.getElementById('RzeczywistaWysokosc').innerHTML = RzeczywistaWysokosc+'m n.p.m.'; 
});

//---------------------------Przycisk-------------------------------

var value="On"

function myFunction() {
if(value == "Off"){
value="On"
document.getElementById('onoff').innerHTML = "ON"; 
document.getElementById('led').innerHTML = "0"; 
}else{
value="Off"
document.getElementById('onoff').innerHTML = "OFF"; 
document.getElementById('led').innerHTML = "1"; 
}
}

//---------------------------Ustawienia-------------------------------

var button = document.querySelector(".zębatka");
var buttonX = document.querySelector(".X");
var ustawienia = document.querySelector(".ustawienia");

button.addEventListener("click", function() {
    if (ustawienia.style.display === "none") {
        ustawienia.style.display = "flex";
    } 
    else {
        ustawienia.style.display = "none";
    }
});
buttonX.addEventListener("click", function() {
    ustawienia.style.display = "none";
});

//---------------------------Wersje kolorystyczne-------------------------------

var checkbox = document.getElementById("lighttheme");

checkbox.addEventListener("change", function() {
  if (checkbox.checked) {
    document.documentElement.style.setProperty("--light", "#2c2d3a");
    document.documentElement.style.setProperty("--dark", "#f0f3f0");
    document.documentElement.style.setProperty("--light_green", "#255733");
    document.documentElement.style.setProperty("--dark_green", "#3d7039");
    document.documentElement.style.setProperty("--light_gray", "#5a5d5a");
    document.documentElement.style.setProperty("--dark_gray", "#acb3ad");
    document.documentElement.style.setProperty("--light_half", "#2c2d3aad");
    document.documentElement.style.setProperty("--dark_half", "#f0f3f04b");
  } else {
    document.documentElement.style.setProperty("--light", "#f0f3f0");
    document.documentElement.style.setProperty("--dark", "#2c2d3a");
    document.documentElement.style.setProperty("--light_green", "#3d7039");
    document.documentElement.style.setProperty("--dark_green", "#255733");
    document.documentElement.style.setProperty("--light_gray", "#acb3ad");
    document.documentElement.style.setProperty("--dark_gray", "#5a5d5a");
    document.documentElement.style.setProperty("--light_half", "#f0f3f04b");
    document.documentElement.style.setProperty("--dark_half", "#2c2d3aad");
  }
});

//---------------------------Strefy-------------------------------

var strefa1 = document.querySelector(".strefa1");
var buttonX1 = document.querySelector(".X1");
var szczegóły1 = document.querySelector(".szczegóły1");

strefa1.addEventListener("click", function() {
    if (szczegóły1.style.display === "none") {
        szczegóły1.style.display = "flex";
    } 
    else {
        szczegóły1.style.display = "none";
    }
});
buttonX1.addEventListener("click", function() {
    szczegóły1.style.display = "none";
});

var strefa2 = document.querySelector(".strefa2");
var buttonX2 = document.querySelector(".X2");
var szczegóły2 = document.querySelector(".szczegóły2");

strefa2.addEventListener("click", function() {
    if (szczegóły2.style.display === "none") {
        szczegóły2.style.display = "flex";
    } 
    else {
        szczegóły2.style.display = "none";
    }
});
buttonX2.addEventListener("click", function() {
    szczegóły2.style.display = "none";
});

var strefa3 = document.querySelector(".strefa3");
var buttonX3 = document.querySelector(".X3");
var szczegóły3 = document.querySelector(".szczegóły3");

strefa3.addEventListener("click", function() {
    if (szczegóły3.style.display === "none") {
        szczegóły3.style.display = "grid";
    } 
    else {
        szczegóły3.style.display = "none";
    }
});
buttonX3.addEventListener("click", function() {
    szczegóły3.style.display = "none";
});

//-----------------------------wyszukiwarka--------------------
const searchInput = document.querySelector(".szukaj");

searchInput.addEventListener("input", (e) => {
    const value = e.target.value
    console.log(value)
})