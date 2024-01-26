type SchemaErrorType = 'REQUIRED_FIELD' | 'INVALID_FIELD' | 'EMAIL' | 'MININUM_LENGTH' | 'CODE_ERROR';

export const zodSchemaErrors: Record<SchemaErrorType, string> = {
  REQUIRED_FIELD: 'Campo obrigatório',
  INVALID_FIELD: 'Campo inválido',
  EMAIL: 'E-mail inválido',
  MININUM_LENGTH: 'Mínimo de 6 caracteres',
  CODE_ERROR: 'Código inválido',
};
