import mongoose from 'mongoose';

// Colección "readings": histórico completo de lecturas del ESP32
const readingSchema = new mongoose.Schema(
  {
    deviceId: { type: String, required: true },
    temperatura: { type: Number, required: true },
    humedad: { type: Number, required: true },
    nivelAgua: { type: Number, required: true, min: 0, max: 4 },
    nivelAguaPct: { type: Number }, // 0, 25, 50, 75, 100
    timestamp: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

// Índice para consultas por dispositivo ordenadas por fecha
readingSchema.index({ deviceId: 1, timestamp: -1 });

export const Reading = mongoose.model('Reading', readingSchema);
