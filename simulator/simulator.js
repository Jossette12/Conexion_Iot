// Simula al ESP32: envía una lectura cada 10 segundos a POST /sensor-data
// Uso: node simulator.js [url] [intervaloMs]
//   node simulator.js
//   node simulator.js https://mi-backend.up.railway.app 2000

const BASE_URL = process.argv[2] || process.env.API_URL || 'http://localhost:3000';
const INTERVAL_MS = Number(process.argv[3]) || 10_000;
const DEVICE_ID = process.env.DEVICE_ID || 'esp32_1';

let temp = 24;
let hum = 55;
let agua = 4;

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const round2 = (v) => Math.round(v * 100) / 100;

function nextReading() {
  temp = clamp(temp + (Math.random() - 0.5) * 2, 15, 40);
  hum = clamp(hum + (Math.random() - 0.5) * 4, 20, 95);
  if (Math.random() < 0.2) agua = clamp(agua + (Math.random() < 0.5 ? -1 : 1), 0, 4);

  return {
    deviceId: DEVICE_ID,
    temperatura: round2(temp),
    humedad: round2(hum),
    nivelAgua: agua,
  };
}

async function send() {
  const body = nextReading();
  try {
    const res = await fetch(`${BASE_URL}/sensor-data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    console.log(new Date().toLocaleTimeString(), res.status, JSON.stringify(body));
  } catch (err) {
    console.error('Error enviando:', err.message);
  }
}

console.log(`Enviando a ${BASE_URL}/sensor-data cada ${INTERVAL_MS / 1000}s (Ctrl+C para salir)`);
send();
setInterval(send, INTERVAL_MS);
