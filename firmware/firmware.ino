#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "SENAC";
const char* password = "$enac2021";

String serverName = "http://10.10.87.207:3000/api/device-history";

int pinoLed = 2;
int pinoSensorLuz = 34;
int valorLuz = 0;
int state = 0;
int stateAnterior = 0;

void setup() {
  Serial.begin(115200); 

  pinMode(pinoLed, OUTPUT);

  WiFi.begin(ssid, password);
  Serial.println("Conectando");
  
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.print("Conectado ao WiFi com o IP: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  valorLuz = analogRead(pinoSensorLuz);

  if(valorLuz<750) {
    state = 1;
  } else {
    state = 0;
  }

  Serial.print("state: ");
  Serial.println(state);

  delay(100);
  
  Serial.print("stateAnterior: ");
  Serial.println(stateAnterior);

  delay(100);

  Serial.print("valorLuz: ");
  Serial.println(valorLuz);

  delay(100);

  if (state != stateAnterior) {
    Serial.print("Mudou de estado: ");
    Serial.println(state);

    if (WiFi.status() == WL_CONNECTED) {
      WiFiClient client;
      HTTPClient http;

      Serial.print("Conectando ao servidor: ");
      Serial.println(serverName);
      
      http.begin(client, serverName);
      
      http.addHeader("Content-Type", "application/json");
    
      if (state == 1) {
        digitalWrite(pinoLed, HIGH);
      } else {
        digitalWrite(pinoLed, LOW);
      }
            
      int httpResponseCode = http.POST("{\"name\":\"light-sensor-01\", \"status\":" + String(state) + "}");

      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      
      http.end();
    } else {
      Serial.println("WiFi Disconnected");
    }
  }
  
  stateAnterior = state;

  delay(1000);
}
