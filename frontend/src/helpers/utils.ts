export function generateId(length) {
  const dec2hex = dec => ('0' + dec.toString(16)).substr(-2);

  var arr = new Uint8Array((length || 40) / 2)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, dec2hex).join('')
}

export function formatMoney(num: number, locale: string = 'en-US', options: any = {}) {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    ...options
  });

  return formatter.format(num);
}

export function getDate(vdate) {
  const date = new  Date(vdate);

  // normalize timezone
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  return date;
}

export function formatDate(vdate, format?: string) {
  const date = getDate(vdate); new Date(vdate);

  let result = '';

  switch (format) {
    case 'm/d/Y':
      result = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    break;
    case 'm/d/y':
      result = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear().toString().slice(-2);
    break;
    case 'm.d.y':
      result = (date.getMonth() + 1) + '.' + date.getDate() + '.' + date.getFullYear().toString().slice(-2);
    break;
    case 'MMM':
      result = date.toLocaleString('default', { month: 'short' });
    break;
    case 'MMMM':
      result = date.toLocaleString('default', { month: 'long' });
    break;

    case 'm.d.Y':
    case 'short':
    default:
      // m.d.Y
      result = (date.getMonth() + 1) + '.' + date.getDate() + '.' + date.getFullYear();
    break;
  }
  return result;
}

export function arrayShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}
