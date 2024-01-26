import { z } from 'zod';

import { zodSchemaErrors } from '@/_base/errors/zodSchemaErrors';
import { IUser } from '../user';
import { ZodCustomSchema } from '../zod';

/** Interfaces and Types */
export interface IAuthRequest {
  identifier: string;
  password: string;
}

export interface IAuthResponse {
  access_token: string;
  user: IUser;
}

/** Zod schemas */
export const authSchema: ZodCustomSchema<IAuthRequest> = z.object({
  identifier: z
    .string({ required_error: zodSchemaErrors.REQUIRED_FIELD })
    .email({ message: zodSchemaErrors.EMAIL })
    .min(6, { message: zodSchemaErrors.MININUM_LENGTH }),
  password: z.string({ required_error: 'Campo obrigatório' }).min(6, { message: zodSchemaErrors.MININUM_LENGTH }),
});
