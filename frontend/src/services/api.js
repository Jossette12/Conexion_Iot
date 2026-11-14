import { io } from 'socket.io-client';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function get(path) {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export const api = {
  latest: (deviceId = 'esp32_1') => get(`/sensor-data/latest?deviceId=${deviceId}`),
  history: (deviceId = 'esp32_1') => get(`/sensor-data/history?deviceId=${deviceId}`),
  hourly: (deviceId = 'esp32_1') => get(`/stats/hourly?deviceId=${deviceId}`),
};

export const socket = io(API_URL, { autoConnect: false });
