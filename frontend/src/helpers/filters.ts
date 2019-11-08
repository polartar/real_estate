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

export function getBuildingTypeLabel(value) {
  const structure = getBuildingTypeStructure();

  const type = structure.filter(b => b.value === value);

  return type.length ? type[0].name : value;
}
