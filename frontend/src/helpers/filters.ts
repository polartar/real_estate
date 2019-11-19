export function getBedsLabel(value) {
  let label = value;
  switch (value) {
    case 'room':
      label = 'Room';
      break;

    case 'studio':
      label = 'Studio';
      break;

    default:
      return value;
  }

  return label;
}

export function getBedsListingText(bedroomType, format: string = 'long') {

  switch (format) {
    case 'short':
        return bedroomType.rooms_count < 1 ? bedroomType.name : `${bedroomType.name} BD`
    case 'long':
    default:
        return bedroomType.rooms_count < 1 ? bedroomType.name : `${bedroomType.name} Bedroom`
  }
}

export function getBedsSortValue(value) {
  switch (value) {
    case 'room':
      return -1;

    case 'studio':
      return 0;

    default:
      return value;
  }
}
