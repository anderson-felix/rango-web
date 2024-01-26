export const currencyTypes = <const>['BRL', 'USD', 'EUR'];
export type CurrencyType = (typeof currencyTypes)[number];

type CurrencyFuncType = (value: number | string, currency?: CurrencyType) => string;

export const formatCurrency: CurrencyFuncType = (value, currency = 'BRL') => {
  const targetValue = parseFloat(`${value}`);

  if (isNaN(targetValue)) return 'Invalid Value';

  let prefix = '';

  switch (currency) {
    case 'BRL':
      prefix = 'R$';
      break;
    case 'EUR':
      prefix = '€';
      break;
    case 'USD':
      prefix = '$';
      break;
    default:
      return 'Unknown Currency';
  }

  const formattedValue = targetValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  return `${prefix} ${formattedValue}`;
};

export const parseCurrency: CurrencyFuncType = (value) => {
  const targetValue = String(value);

  const numericValue = targetValue.replace(/[^\d.,]/g, '').replace(',', '');

  // Convertendo para um número
  const parsedValue = parseFloat(numericValue);

  // Verificando se é um número válido
  if (isNaN(parsedValue)) return 'Invalid Currency Format';

  return parsedValue.toString();
};
