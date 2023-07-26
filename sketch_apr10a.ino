#include <SocketIoClient.h>
SocketIoClient socketIO;

void setup() {
  pinMode(13, OUTPUT);
  digitalWrite(13, LOW);
  
  Serial.begin(9600);
  socketIO.begin("http://localhost:3000");

  socketIO.on("startBlink", []() {
    digitalWrite(13, LOW);
    Serial.println("Blink started");
  });

  socketIO.on("stopBlink", []() {
    digitalWrite(13, LOW);
    Serial.println("Blink stopped");
  });

  socketIO.on("toggleLed", []() {
    digitalWrite(13, !digitalRead(13));
  });
}

void loop() {
  socketIO.loop();
}
