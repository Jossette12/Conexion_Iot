import { Reading } from '../models/Reading.js';

// Capa de acceso a MongoDB
export const readingRepository = {
  create: (data) => Reading.create(data),

  findLatest: (deviceId, limit = 10) =>
    Reading.find(deviceId ? { deviceId } : {})
      .sort({ timestamp: -1 })
      .limit(limit)
      .lean(),

  // TODO (Integrante 1): promedio por hora con aggregation pipeline
  // ($match por deviceId -> $group por hora con $dateTrunc -> $avg)
  hourlyAverage: async (_deviceId) => [],
};
