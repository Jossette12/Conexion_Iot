import { parsePayload, sensorService } from '../services/sensorService.js';

const DEFAULT_DEVICE = 'esp32_1';

// Envuelve handlers async para mandar los errores al middleware de errores
const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res)).catch(next);

export const sensorController = {
  create: wrap(async (req, res) => {
    const { data, errors } = parsePayload(req.body);
    if (errors) return res.status(400).json({ ok: false, errors });
    const reading = await sensorService.ingest(data);
    res.status(201).json({ ok: true, reading });
  }),

  latest: wrap(async (req, res) => {
    res.json(await sensorService.latest(req.query.deviceId || DEFAULT_DEVICE));
  }),

  history: wrap(async (req, res) => {
    res.json(await sensorService.history(req.query.deviceId || DEFAULT_DEVICE));
  }),

  devices: wrap(async (_req, res) => {
    res.json(await sensorService.devices());
  }),

  hourly: wrap(async (req, res) => {
    res.json(await sensorService.hourly(req.query.deviceId || DEFAULT_DEVICE));
  }),
};
