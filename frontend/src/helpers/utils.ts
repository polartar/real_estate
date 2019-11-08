import { getBuildingTypeStructure } from './filters';

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

export function formatDate(date: Date, format?: string) {
  let result = '';

  switch (format) {
    // m.d.Y
    case 'short':
    default:
      result = (date.getMonth() + 1) + '.' + date.getDate() + '.' + date.getFullYear();
    break;
  }
  return result;
}

/*
 *  Generate placeholder listings
 */
export function generateListings(num: number = 10) {
  let baseListing = {
    id: 1,
    address: '321 Front Street',
    latitude: 40.722412,
    longitude: -73.995290,
    price: 8300,
    bedrooms: 3,
    bathrooms: 2,
    rating: 5,
    neighborhood_id: 10,
    building_type: 'elevator',
    available_date: '12/01/2019',
    images: []
  };

  const buildingTypes = getBuildingTypeStructure();

  let listings = [];

  for (let i = 0; i < num; i++) {
    let listing = { ...baseListing };
    let unit_num = Math.ceil(Math.random() * 1000);
    let unit_str = arrayShuffle(['Front', 'Side', 'Main', 'Ventura', 'Jersey', 'Blake', 'Connor', 'David', 'Woodgrove']).pop();
    let unit_str_type = arrayShuffle(['Street', 'Str', 'Ave', 'Avenue', 'Place', 'Pl', 'Grove', 'Circle']).pop();

    let latdir = Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    let lngdir = Math.floor(Math.random() * 2) == 1 ? 1 : -1;

    listing.id = Math.round(Math.random() * 100000);
    listing.address = `${unit_num} ${unit_str} ${unit_str_type}`;
    listing.latitude = baseListing.latitude + (latdir * (Math.random() / 10));
    listing.longitude = baseListing.longitude + (lngdir * (Math.random() / 10));
    listing.price = Math.ceil(Math.random() * 10000) + 1000;
    listing.bedrooms = Math.ceil(Math.random() * 4);
    listing.bathrooms = Math.ceil(Math.random() * 4);
    listing.rating = Math.ceil(Math.random() * 5);
    listing.building_type = arrayShuffle([ ...buildingTypes]).pop().value;

    let numPics = Math.round(Math.random() * 10) + 1;
    let images = [];
    for (let i = 0; i < numPics; i++) {
      images.push('https://picsum.photos/seed/' + listing.id + '/400/300.jpg');
    }

    listing.images = [...images];

    listings.push({ ...listing });

    listing = null;
  }

  return listings;
}

export function arrayShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}
