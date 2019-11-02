import { getBedsLabel, getBuildingTypeStructure } from '../../helpers/filters';
import { formatMoney, formatDate } from '../../helpers/utils';

class FilterTagsServiceInstance {
  tagPriorities: any = {
    beds: 10,
    bathrooms: 20,
    price: 30,
    moveInDate: 40,
    buildingTypes: 50,
    location: 60
  };

  bedPriorities: any = {
    room: 1,
    studio: 2,
    1: 3,
    2: 4,
    3: 5,
    4: 6,
    5: 7
  };

  getPrioritizedTags(filters) {
    const tags = [];

    // beds tag
    if (filters.beds.length) {
      let title = 'Beds: ';

      let labels = filters.beds.sort((a, b) => {
        return this.bedPriorities[a] - this.bedPriorities[b];
      });

      labels = labels.map(l => getBedsLabel(l));

      title += this.stringifyResult(labels);

      tags.push({
        type: 'beds',
        title,
        priority: this.tagPriorities.beds
      });
    }

    // bathrooms tag
    if (filters.bathrooms.length) {
      let title = 'Baths: ';

      let labels = filters.bathrooms.sort((a, b) => {
        return a - b;
      });

      title += this.stringifyResult(labels);

      tags.push({
        type: 'bathrooms',
        title,
        priority: this.tagPriorities.bathrooms
      });
    }

    // price tag
    if (filters.price) {
      const min = formatMoney(filters.price.min);
      const max = formatMoney(filters.price.max);

      tags.push({
        type: 'price',
        title: `Price: ${min} - ${max}`,
        priority: this.tagPriorities.price
      });
    }

    // move in date tag
    if (filters.moveInDate) {
      tags.push({
        type: 'moveInDate',
        title: formatDate(filters.moveInDate),
        priority: this.tagPriorities.moveInDate
      });
    }

    // building types
    if (filters.buildingTypes.length) {
      let title = 'Building: ';

      let structure = getBuildingTypeStructure();

      let labels = filters.buildingTypes.map(t => {
        return structure.find(p => p.value === t)['name'];
      });

      title += this.stringifyResult(labels);

      tags.push({
        type: 'buildingTypes',
        title,
        priority: this.tagPriorities.buildingTypes
      });
    }

    // location tags
    if (filters.location.length) {

    }

    // filters: {
    //   location: [],
    //   moveInDate: undefined,
    //   price: undefined,
    //   beds: [],
    //   bathrooms: [],
    //   buildingTypes: []
    // }

    return tags.sort((a, b) => a.priority - b.priority);
  }

  stringifyResult(array) {
    if (array.length === 1) {
      return array.join('');
    }

    if (array.length === 2) {
      return array.join(' or ');
    }

    if (array.length > 2) {
      let lastItem = array.pop();

      let result = array.join(', ');

      result += ' or ' + lastItem;

      return result;
    }

    return ''; // ?
  }
}

export const FilterTagsService = new FilterTagsServiceInstance();
