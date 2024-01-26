import { ZodSchema } from 'zod';

interface ZodCustomError {
  type: string;
  message: string;
  path: string[];
}

export const zodErrorHandler = <T>(schema: ZodSchema, data: T): T | null => {
  try {
    schema.parse(data);

    return null;
  } catch (err: any) {
    const error = JSON.parse(err) as ZodCustomError[];

    return error
      .map((e) => {
        const key = e.path.join('.');

        return { [key]: e.message };
      })
      .reduce((acc, value) => {
        const key = Object.keys(value)[0];
        (acc as any)[key] = value[key];
        return acc;
      }, {} as T);
  }
};
