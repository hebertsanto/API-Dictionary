import 'dotenv/config';
import { z } from 'zod';

const envScema = z.object({
  DATABASE_URL: z.string(),
  SECRET_JWT: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number(),
});

const _env = envScema.safeParse(process.env);

if (_env.success == false) {
  throw new Error('Error with env variables');
}

export const env = _env.data;