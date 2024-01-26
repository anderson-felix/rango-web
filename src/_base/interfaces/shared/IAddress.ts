import { z } from 'zod';
import { ZodCustomSchema } from '../zod';

export interface IAddress {
  address?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  country?: string;
  zip_code?: string;
}

export const addressSchema: ZodCustomSchema<IAddress> = z.object({
  address: z.string().trim().optional(),
  number: z.string().trim().optional(),
  complement: z.string().trim().optional(),
  neighborhood: z.string().trim().optional(),
  city: z.string().trim().optional(),
  state: z.string().trim().optional(),
  country: z.string().trim().optional(),
  zip_code: z.string().trim().optional(),
});
