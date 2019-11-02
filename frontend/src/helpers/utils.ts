

export function sayHello() {
  return Math.random() < 0.5 ? 'Hello' : 'Hola';
}

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
    ...options
  });

  return formatter.format(num);
}
