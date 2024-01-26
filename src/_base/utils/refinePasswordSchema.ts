import { ZodSchema } from 'zod';

export const refineSchemaWithPassword = (schema: ZodSchema) =>
  schema.superRefine(({ confirm_password, new_password, password }, ctx) => {
    if ((new_password || confirm_password) && !password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Insert the current password',
        path: ['password'],
      });
    }
    if (new_password && confirm_password !== new_password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirm_password'],
      });
    }
  });
