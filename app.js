var http = require('http');
var fs = require('fs');
var index = fs.readFileSync( 'index.html');
var style = fs.readFileSync('style.css');
var script = fs.readFileSync('script.js');
var scriptsearch = fs.readFileSync('scriptsearch.js');
var dane = fs.readFileSync('plants.json');


var SerialPort = require('serialport');
import('node-fetch');
const parsers = SerialPort.parsers;

const parser = new parsers.Readline({
    delimiter: '\r\n'
});

var port = new SerialPort('COM7',{ 
    baudRate: 57600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

port.pipe(parser);

var app = http.createServer(function(req, res) {
    if (req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(index);
        res.end();
      } else if (req.url === '/style.css') {
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(style);
        res.end();
      } else if (req.url === '/script.js') {
        res.writeHead(200, {'Content-Type': 'text/script'});
        res.write(script);
        res.end();
      } else if (req.url === '/scriptsearch.js') {
        res.writeHead(200, {'Content-Type': 'text/script'});
        res.write(scriptsearch);
        res.end();
      } else if (req.url === '/plants.json') {
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.write(dane);
        res.end();
      } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('404 Not Found\n');
        res.end();
      }
});
let lightsStatus = "0", lightsStatusP , okno, oknoP = "0", podlewanies1, podlewanies2, zraszacz, ogrzewanie = "0";
var io = require('socket.io').listen(app);

io.on('connection', function(socket) {

  console.log('Node is listening to port');

  socket.on('swiatlo', function(data) {
    console.log('Received light data: ', data.status);
    lightsStatus = data.status
  });

  socket.on('window', function(data) {
    console.log('Received window data: ', data.status);
    oknoP = data.status
  });

});

  
port.write("1")
let counter = 0;
let wilgotnoscPW, temperaturaPW, swiatlo, stan_okna, ProcentowaWilgotnoscGlebyS1, ProcentowaWilgotnoscGlebyS2, StanDeszczu, CisnieniePZ, temperaturaPZ, Wysokosc, RzeczywistaWysokosc, wyślij, ProcentowaWilgotnoscGlebyStrefy1;

parser.on('data', data => {
  counter++
  if (counter === 1) {
    const dataArray = data.split('\n');

    wilgotnoscPW = dataArray;
    console.log(`Wilgotność powietrza wewnątrz: ${wilgotnoscPW}%`); // wilgotność powietrza wewnętrzna 0-100
    io.emit('wilgotnoscPW', wilgotnoscPW);
  }
  if (counter === 2) {
    const dataArray = data.split('\n');

    temperaturaPW = dataArray;
    console.log(`Temperatura powietrza wewnątrz: ${temperaturaPW}°C`); // temperatura powietrza wewnętrzna
    io.emit('temperaturaPW', temperaturaPW);
  }
  if (counter === 3) {
    const dataArray = data.split('\n');

    swiatlo = dataArray;
    console.log(`Stopień naświetlenia: ${swiatlo}`); // foterezystor stopień naświtlenia
    io.emit('swiatlo', swiatlo);
  }
  if (counter === 4) {
    const dataArray = data.split('\n');

    stan_okna = dataArray;
    console.log(`Stan okna: ${stan_okna}`); // stan onka zamknięte 0 otwarte 1
    io.emit('stan_okna', stan_okna);
  }
  if (counter === 5) {
    const dataArray = data.split('\n');

    ProcentowaWilgotnoscGlebyS1 = dataArray;
    console.log(`Procentowa wilgotność gleby strefy 1: ${ProcentowaWilgotnoscGlebyS1}%`); // wilgotność gleby strefy 1 0-100
    io.emit('ProcentowaWilgotnoscGlebyS1', ProcentowaWilgotnoscGlebyS1);
    ProcentowaWilgotnoscGlebyStrefy1 = ProcentowaWilgotnoscGlebyS1
  }
  if (counter === 6) {
    const dataArray = data.split('\n');

    ProcentowaWilgotnoscGlebyS2 = dataArray;
    console.log(`Procentowa wilgotność gleby strefy 2: ${ProcentowaWilgotnoscGlebyS2}%`); // wilgotność gleby strefy 2 0-100
    io.emit('ProcentowaWilgotnoscGlebyS2', ProcentowaWilgotnoscGlebyS2);
  }
  if (counter === 7) {
    const dataArray = data.split('\n');

    StanDeszczu = dataArray;
    console.log(`Stan deszczu: ${StanDeszczu}`); // stan czujnika 2 nie pada 1 zagrożenie deszczem 0 deszcz
    io.emit('StanDeszczu', StanDeszczu);
  }
  if (counter === 8) {
    const dataArray = data.split('\n');

    CisnieniePZ = dataArray;
    console.log(`Cisnienie zewnętrzne: ${CisnieniePZ} pascali`); // Ciśnienie zewnętrzne (Pascal)
    io.emit('CisnieniePZ', CisnieniePZ);
  }
  if (counter === 9) {
    const dataArray = data.split('\n');

    temperaturaPZ = dataArray;
    console.log(`Temperatura zewnętrzna: ${temperaturaPZ}°C`); // temperatura zewnętrzna
    io.emit('temperaturaPZ', temperaturaPZ);
  }
  if (counter === 10) {
    const dataArray = data.split('\n');

    Wysokosc = dataArray;
    console.log(`Wysokość: ${Wysokosc} metrów`); // wysokość nwm jaka (metr)
    io.emit('Wysokosc', Wysokosc);
  }
  if (counter === 11) {
    const dataArray = data.split('\n');

    RzeczywistaWysokosc = dataArray;
    console.log(`Rzeczywista Wysokość: ${RzeczywistaWysokosc} metrów nad poziomem morza`);
    io.emit('RzeczywistaWysokosc', RzeczywistaWysokosc); // wysokość nad poziomem morza (metr)
  }
  if (counter === 12) {
    const dataArray = data.split('\n');

    wyślij = dataArray;
    console.log('Stan świateł:', lightsStatus);
    if (lightsStatus === "1") {
      port.write("1");
    }else{
      port.write("0");
    }
  }
  if (counter === 13) {
    const dataArray = data.split('\n');

    wyślij = dataArray;
    console.log(`Stan okna: ${okno}, ${oknoP}`);
    if (okno === "1") {
      if (oknoP === "1"){
        port.write("1");      
      }
    }
    if (okno === "0"){
      if (oknoP === "0"){
        port.write("0")
      }
    }
    if (okno === "1"){
      if (oknoP === "0"){
        port.write("0")
      }
    }
    if (okno === "0"){
      if (oknoP === "1"){

        port.write("1")
        console.log("wysyłam 1")
      }
    }
  }
  if (counter === 14) {
    const dataArray = data.split('\n');

    wyślij = dataArray;
    console.log('podlewanie strefy 1:', podlewanies1);
    if (podlewanies1 === "1") {
      port.write("1");
    }else{
      port.write("0");
    }
  }
  if (counter === 15) {
    const dataArray = data.split('\n');

    wyślij = dataArray;
    console.log('podlewanie strefy 2:', podlewanies2);
    if (podlewanies2 === "1") {
      port.write("1");
    }else{
      port.write("0");
    }
  }
  if (counter === 16) {
    const dataArray = data.split('\n');

    wyślij = dataArray;
    console.log('Zraszanie:', zraszacz);
    if (zraszacz === "1") {
      port.write("1");
    }else{
      port.write("0");
    }
  }
  if (counter === 17) {
    const dataArray = data.split('\n');

    wyślij = dataArray;
    console.log('Ogrzewanie:', ogrzewanie);
    if (ogrzewanie === "1") {
      port.write("1");
    }else{
      port.write("0");
    }
    console.log("========================================================================================================")
    counter = 0
  }

 var min_wilgotnosc_gleby, max_wilgotnosc_gleby, min_wilgotnosc_powietrza, min_temperatura, max_temperatura;

fetch('http://127.0.0.1:3000/plants.json') //Ważne aby zmienić tutaj ip4 urządzenia na którym jest serwer!!!
.then(res => res.json())
.then(data => {
  min_wilgotnosc_gleby = data.find(plantz => plantz.id === 1).min_wilgotnosc_gleby
  max_wilgotnosc_gleby = data.find(plantz => plantz.id === 1).max_wilgotnosc_gleby
  min_wilgotnosc_powietrza = data.find(plantz => plantz.id === 1).min_wilgotnosc_powietrza
  min_temperatura = data.find(plantz => plantz.id === 1).min_temperatura
  max_temperatura = data.find(plantz => plantz.id === 1).max_temperatura
  if(ProcentowaWilgotnoscGlebyS1 <= min_wilgotnosc_gleby){
    podlewanies1 = "1"
  }else{
    podlewanies1 = "0"
  }
  if(ProcentowaWilgotnoscGlebyS2 <= min_wilgotnosc_gleby){
    podlewanies2 = "1"
  }else{
    podlewanies2 = "0"
  }
  if(temperaturaPW >= min_temperatura || temperaturaPW <= max_temperatura){
  ogrzewanie = "0"
  okno = "0"
  }else{
    if(temperaturaPW >= max_temperatura){
      ogrzewanie = "0"
      if (temperaturaPZ < temperaturaPW){
        okno = "1"
      }else{
        okno = "0"
      }
    }else{
      ogrzewanie = "1"
    }
  }
  if(wilgotnoscPW <= min_wilgotnosc_powietrza){
    zraszacz = "1"
  }else{
    zraszacz = "0"
  }
})
});


app.listen(3000);