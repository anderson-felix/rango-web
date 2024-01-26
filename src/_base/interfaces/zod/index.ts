import * as z from 'zod';

export type ZodCustomSchema<T> = z.ZodObject<Record<keyof T, z.Schema>>;
