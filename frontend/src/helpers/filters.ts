export function getBedsListingText(bedroomType, format: string = 'long') {

  if (!bedroomType) {
    return '';
  }

  switch (format) {
    case 'short':
        return bedroomType.rooms_count < 1 ? bedroomType.name : `${bedroomType.name} BD`
    case 'long':
    default:
        return bedroomType.rooms_count < 1 ? bedroomType.name : `${bedroomType.name} Bedroom`
  }
}
