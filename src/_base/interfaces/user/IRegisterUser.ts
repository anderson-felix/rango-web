import { z } from 'zod';

import { zodSchemaErrors } from '@/_base/errors/zodSchemaErrors';
import { ZodCustomSchema } from '../zod';

/** Interfaces and Types */
export default interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  birthdate: Date;
  phone: string;
}

export const EMPTY_REGISTER_USER_DATA: IRegisterUser = {
  name: '',
  email: '',
  password: '',
  phone: '',
  birthdate: undefined as any,
};

/** Zod schemas */
export const registerUserSchema: ZodCustomSchema<IRegisterUser> = z.object({
  name: z.string({ required_error: zodSchemaErrors.REQUIRED_FIELD }).trim().min(6, { message: zodSchemaErrors.MININUM_LENGTH }),
  email: z.string().email().optional(),
  password: z.string({ required_error: zodSchemaErrors.REQUIRED_FIELD }).min(6, { message: zodSchemaErrors.MININUM_LENGTH }),
  password_confirmation: z.string({ required_error: zodSchemaErrors.REQUIRED_FIELD }).min(6, { message: zodSchemaErrors.MININUM_LENGTH }),
  phone: z.string({ required_error: zodSchemaErrors.REQUIRED_FIELD }).trim().min(8, { message: zodSchemaErrors.MININUM_LENGTH }),
  birthdate: z.date({ required_error: zodSchemaErrors.REQUIRED_FIELD }).max(new Date(), { message: zodSchemaErrors.INVALID_FIELD }),
});
