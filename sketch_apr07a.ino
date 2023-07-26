#define BUTTON_PIN 4

void setup()
{
  Serial.begin(57600);
  digitalWrite(LED_BUILTIN, LOW);
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
 
  int wilgotnoscPW = 0;
  int temperaturaPW = 0;
  int swiatlo = 0;
  int stan_okna = 0;
  int ProcentowaWilgotnoscGlebyS1 = 0;
  int ProcentowaWilgotnoscGlebyS2 = 0;
  int StanDeszczu = 0;
  int CisnieniePZ = 0;
  int temperaturaPZ = 0;
  int Wysokosc = 0;
  int RzeczywistaWysokosc = 0;
  int odbieranie = 0;
  
}
void loop()
{
  byte buttonState = digitalRead(BUTTON_PIN);
  
  if (buttonState == LOW) {
    int wilgotnoscPW = 0;
    int temperaturaPW = 0;
    int swiatlo = 0;
    int stan_okna = 0;
    int ProcentowaWilgotnoscGlebyS1 = 0;
    int ProcentowaWilgotnoscGlebyS2 = 0;
    int StanDeszczu = 0;
    int CisnieniePZ = 0;
    int temperaturaPZ = 0;
    int Wysokosc = 0;
    int RzeczywistaWysokosc = 0;
    int odbieranie = 0;
      
    Serial.println(wilgotnoscPW);                // wilgotność powietrza wewnętrzna 0-100
    Serial.println(temperaturaPW);               // temperatura powietrza wewnętrzna
    Serial.println(swiatlo);                     // foterezystor stopień naświtlenia
    Serial.println(stan_okna);                   // stan onka zamknięte 0 otwarte 1
    Serial.println(ProcentowaWilgotnoscGlebyS1); // wilgotność gleby strefy 1 0-100
    Serial.println(ProcentowaWilgotnoscGlebyS2); // wilgotność gleby strefy 2 0-100
    Serial.println(StanDeszczu);                 // stan czujnika 2 nie pada 1 zagrożenie deszczem 0 deszcz
    Serial.println(CisnieniePZ);                 // Ciśnienie zewnętrzne        (Pascal)
    Serial.println(temperaturaPZ);               // temperatura zewnętrzna
    Serial.println(Wysokosc);                    // wysokość nwm jaka           (metr)
    Serial.println(RzeczywistaWysokosc);          // wysokość nad poziomem morza (metr)
    Serial.println(odbieranie);  
  }
  else {
    int wilgotnoscPW = 65;
    int temperaturaPW = 20;
    int swiatlo = 1;
    int stan_okna = 1;
    int ProcentowaWilgotnoscGlebyS1 = 33;
    int ProcentowaWilgotnoscGlebyS2 = 65;
    int StanDeszczu = 1;
    int CisnieniePZ = 20;
    int temperaturaPZ = 10;
    int Wysokosc = 2;
    int RzeczywistaWysokosc = 175;
    int odbieranie = 12;
    
    Serial.println(wilgotnoscPW);                // wilgotność powietrza wewnętrzna 0-100
    Serial.println(temperaturaPW);               // temperatura powietrza wewnętrzna
    Serial.println(swiatlo);                     // foterezystor stopień naświtlenia
    Serial.println(stan_okna);                   // stan onka zamknięte 0 otwarte 1
    Serial.println(ProcentowaWilgotnoscGlebyS1); // wilgotność gleby strefy 1 0-100
    Serial.println(ProcentowaWilgotnoscGlebyS2); // wilgotność gleby strefy 2 0-100
    Serial.println(StanDeszczu);                 // stan czujnika 2 nie pada 1 zagrożenie deszczem 0 deszcz
    Serial.println(CisnieniePZ);                 // Ciśnienie zewnętrzne        (Pascal)
    Serial.println(temperaturaPZ);               // temperatura zewnętrzna
    Serial.println(Wysokosc);                    // wysokość nwm jaka           (metr)
    Serial.println(RzeczywistaWysokosc);
    Serial.println(odbieranie);             // wysokość nad poziomem morza (metr)
  }

  if (Serial.available() > 0) {

    String receivedString = "";

    while (Serial.available() > 0) {
      receivedString += char(Serial.read ());
    }

    //Serial.println(receivedString);

    if(receivedString == "1")
      digitalWrite(LED_BUILTIN, HIGH);
    else
      digitalWrite(LED_BUILTIN, LOW); 
  }
  delay(500);
}
