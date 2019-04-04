export const isString = function(obj) {
  return (Object.prototype.toString.call(obj) === '[object String]');
}


export const toCurrency = (value, digits = 2, params={currency: '$', before: true}) => 
  `${params.before ? params.currency : ''}${value.toLocaleString(
    undefined, // to use the browser's locale,
    { minimumFractionDigits: digits }
  )} ${params.after ? params.currency : ''}`;
