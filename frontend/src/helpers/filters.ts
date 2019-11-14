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

export function getBuildingTypeStructure() {
  return [{
    name: 'Walk Up',
    value: 'walkup',
    rating: 3,
    sortOrder: 1
  },
  {
    name: 'Elevator',
    value: 'elevator',
    rating: 4,
    sortOrder: 2,
  },
  {
    name: 'Elevator / Doorman',
    value: 'elevator-doorman',
    rating: 5,
    sortOrder: 3
  }];
}

export function getBuildingTypeSortValue(value) {
  const structure = getBuildingTypeStructure();

  const type = structure.filter(v => v.value === value);

  return type.length ? type[0].sortOrder : 0;
}

export function getBuildingTypeLabel(value) {
  const structure = getBuildingTypeStructure();

  const type = structure.filter(b => b.value === value);

  return type.length ? type[0].name : value;
}
