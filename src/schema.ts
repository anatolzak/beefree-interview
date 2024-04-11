import { z } from 'zod';

export const droneCameraSchema = z.object({
  name: z.string().min(1),
  megapixels: z.coerce.number(),
  type: z.string().min(1)
});

export const droneSchema = z.object({
  drone_code: z.string().min(1),
  name: z.string().min(1),
  range: z.coerce.number(),
  release_date: z.string().min(1),
  cameras: z.array(droneCameraSchema).min(1)
});
