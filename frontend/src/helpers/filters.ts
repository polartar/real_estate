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

export function getBuildingTypeStructure() {
  return [{
    name: 'Walk Up',
    value: 'walkup',
    rating: 3,
  },
  {
    name: 'Elevator',
    value: 'elevator',
    rating: 4,
  },
  {
    name: 'Elevator / Doorman',
    value: 'elevator-doorman',
    rating: 5,
  }];
}
