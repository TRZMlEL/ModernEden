var http = require('http');
var fs = require('fs');
var index = fs.readFileSync( 'index.html');
var style = fs.readFileSync('style.css');
var script = fs.readFileSync('script.js');

var SerialPort = require('serialport');
const parsers = SerialPort.parsers;

const parser = new parsers.Readline({
    delimiter: '\r\n'
});

var port = new SerialPort('COM6',{ 
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
      } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('404 Not Found\n');
        res.end();
      }
});

var io = require('socket.io').listen(app);

io.on('connection', function(socket) {
    
    console.log('Node is listening to port');
    
});

let counter = 0;
let wilgotnoscPW, temperaturaPW, swiatlo, stan_okna, ProcentowaWilgotnoscGlebyS1, ProcentowaWilgotnoscGlebyS2, StanDeszczu, CisnieniePZ, temperaturaPZ, Wysokosc, RzeczywistaWysokosc;

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
    counter = 0;
  }
});

app.listen(3000);