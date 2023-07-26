//---------------------------Odbieranie danych-------------------------------
let wilgotnoscPW;
let ProcentowaWilgotnoscGlebyStrefy1;
let fetchExecuted = false;
var socket = io();

socket.on('wilgotnoscPW', function(wilgotnoscPW) {
    document.getElementById('wilgotnoscPW').innerHTML = wilgotnoscPW+'%';
    WilgotnoscPW = wilgotnoscPW
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
    document.getElementById('ProcentowaWilgotnoscGlebyS1').innerHTML = ProcentowaWilgotnoscGlebyS1 + '%';

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
    document.getElementById('CisnieniePZ').innerHTML = CisnieniePZ/100+'hPa'; 
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

var swiec = document.getElementById("swiec") 
var okno = document.getElementById("okno")
let valuew="Off"
let valuee="Off" 


swiec.addEventListener("click", () => {
    if(valuew == "Off"){
        valuew="On"
        swiec.innerHTML = "ON";
        console.log("ON swiatlo");
        socket.emit('swiatlo', { "status":"1" });
    }else{
        valuew="Off"
        swiec.innerHTML = "OFF";
        console.log("OFF swiatlo");
        socket.emit('swiatlo', { "status":"0" });
    }
})

okno.addEventListener("click", () => {
    if(valuee == "Off"){
        valuee="On"
        okno.innerHTML = "ON";
        console.log("ON okno");
        socket.emit('window', { "status":"1" });
    }else{
        valuee="Off"
        okno.innerHTML = "OFF";
        console.log("OFF okno");
        socket.emit('window', { "status":"0" });
    }
})

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
    document.querySelector(".logo").src = "https://media.discordapp.net/attachments/1093668541514915880/1095131847303897259/MODERNEDENB.png?width=1440&height=536"
  } else {
    document.documentElement.style.setProperty("--light", "#f0f3f0");
    document.documentElement.style.setProperty("--dark", "#2c2d3a");
    document.documentElement.style.setProperty("--light_green", "#3d7039");
    document.documentElement.style.setProperty("--dark_green", "#255733");
    document.documentElement.style.setProperty("--light_gray", "#acb3ad");
    document.documentElement.style.setProperty("--dark_gray", "#5a5d5a");
    document.documentElement.style.setProperty("--light_half", "#f0f3f04b");
    document.documentElement.style.setProperty("--dark_half", "#2c2d3aad");
    document.querySelector(".logo").src = "https://cdn.discordapp.com/attachments/1093668541514915880/1096794932594868244/MODERNEDENwhite.png"
  }
});

//---------------------------Strefy------------------------------->

var dodaj = document.querySelector(".strefa3");
var buttonX3 = document.querySelector(".X3");
var szczegóły3 = document.querySelector(".szczegóły3");
var buttonX2 = document.querySelector(".X2");
var buttonX1 = document.querySelector(".X1");
const szczegóły2 = document.querySelector(".szczegóły2")
const szczegóły1 = document.querySelector(".szczegóły1")

dodaj.addEventListener("click", function() {
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
buttonX2.addEventListener("click", function() {
    szczegóły2.style.display = "none";
});
buttonX1.addEventListener("click", function() {
    szczegóły1.style.display = "none";
});

function sendToArduino(data) {
    socket.emit('message', data);
}

//----------------dodawanie nowych stref------------------------->
const strefyTemplate = document.querySelector("[strefy-template]")
const strefyContainer = document.querySelector(".container2")
var name
let clickCount = 0;

function setPlantDetails(plant) {
    if(clickCount >= 4){
        clickCount = 4
        return
    }
  const strefy = strefyTemplate.content.cloneNode(true).children[0];
  console.log(plant.name);
  const zdjęcie = strefy.querySelector(".zdjęcie")
  const nagłówek = strefy.querySelector(".nagłówek")
  const numer = strefy.querySelector(".numer")
  nagłówek.textContent = plant.name;
  zdjęcie.src = plant.photo;
  szczegóły3.style.display = "none";
  strefyContainer.append(strefy);
  console.log(clickCount)
  if(clickCount === 1){
    numer.innerHTML = "Strefa 1"
    strefy.setAttribute("id", "uga1")
    document.getElementById("uga1").addEventListener("click", function() {
        const tlo = document.querySelector(".szczegóły1")
        const min = document.querySelector(".min1")
        const max = document.querySelector(".max1")
        if (szczegóły1.style.display === "none") {
            szczegóły1.style.display = "flex";
        } 
        else {
            szczegóły1.style.display = "none";
        }
        const nazwaszczegóły1 = document.querySelector(".nazwaszczegóły1")
        nazwaszczegóły1.innerHTML = plant.name
        tlo.style.backgroundImage = `url('${plant.tlo}')`;
        min.innerHTML = plant.min_wilgotnosc_gleby
        max.innerHTML = plant.max_wilgotnosc_gleby
    })
  }
  if(clickCount === 2){
    strefyContainer.removeChild(strefy)
  }
  if(clickCount === 3){
    numer.innerHTML = "Strefa 2"
    strefy.setAttribute("id", "buga2")
    document.getElementById("buga2").addEventListener("click", function() {
        const tlo = document.querySelector(".szczegóły2")
        const min = document.querySelector(".min2")
        const max = document.querySelector(".max2")
        if (szczegóły2.style.display === "none") {
            szczegóły2.style.display = "flex";
        }   
        else {
            szczegóły2.style.display = "none";
        }
        const nazwaszczegóły2 = document.querySelector(".nazwaszczegóły2")
        nazwaszczegóły2.innerHTML = plant.name
        tlo.style.backgroundImage = `url('${plant.tlo}')`;
        min.innerHTML = plant.min_wilgotnosc_gleby
        max.innerHTML = plant.max_wilgotnosc_gleby
    });
  }
  if(clickCount >= 4){
    console.log("Sprawdź podłączenie czujników")
    strefyContainer.removeChild(strefy)
  }
}
console.log(strefyContainer)
const cards = document.querySelectorAll(".plants-cards");

Array.from(cards).forEach(div => {
  div.addEventListener("click", () => {
    fetch('plants.json')
      .then(res => res.json())
      .then(data => {
        for (let i = 1; i <= 31; i++) {
            document.getElementById(i.toString()).addEventListener("click", function() {
            console.log(`Element z id ${i} został kliknięty.`);
            clickCount++;
            const plant = data.find(item => item.id === i);
            setPlantDetails(plant);
          });
        }
      });
  });
});

//-------------------------klikanie------------------->
document.getElementById("uga1").addEventListener("click", function() {
    console.log("1")
})
document.getElementById("buga2").addEventListener("click", function() {
    console.log("2")
});