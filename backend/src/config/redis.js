import Redis from 'ioredis';
import { env } from './env.js';

// Cliente principal (lecturas/escrituras)
export const redis = new Redis(env.redisUrl);
// Cliente dedicado a pub/sub (un cliente suscrito no puede usar otros comandos)
export const redisSub = new Redis(env.redisUrl);

redis.on('connect', () => console.log('[redis] conectado'));
redis.on('error', (err) => console.error('[redis] error:', err.message));
redisSub.on('error', (err) => console.error('[redis-sub] error:', err.message));
