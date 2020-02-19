import xss from 'xss';

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
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
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

export function round(value, decimals) {
  const exponentNum: any = (value + 'e' + decimals);

  // eg. Number(Math.round(1.005+'e2')+'e-2');
  // round(1.005, 2) = 1.01
  return Number(Math.round(exponentNum) + 'e-' + decimals);
}

export function nl2br(str, is_xhtml = true) {
  if (typeof str === 'undefined' || str === null) {
    return '';
  }
  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

export function xssFilter(html, options = {}) {
  return xss.filterXSS(html, options);
}
