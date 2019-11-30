import { formatMoney, formatDate } from '../../helpers/utils';
import neighborhoodSelectors from '../../store/selectors/neighborhoods';

class FilterTagsServiceInstance {
  tagPriorities: any = {
    beds: 10,
    bathrooms: 20,
    price: 30,
    moveInDate: 40,
    buildingTypes: 50,
    locationAll: 60,
    location: 70
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

  getPrioritizedTags(filters, taxonomy) {
    const tags = [];

    // beds tag
    if (filters.beds.length) {
      let title = 'Beds: ';

      let labels = filters.beds.sort((a, b) => {
        const aType = taxonomy.bedroomTypes.find(bed => bed.id === parseInt(a));
        const bType = taxonomy.bedroomTypes.find(bed => bed.id === parseInt(b));

        return aType.rooms_count - bType.rooms_count;
      });

      labels = labels.map(l => {
        const bedType = taxonomy.bedroomTypes.find(bed => bed.id === parseInt(l));

        return bedType.name;
      });

      title += this.stringifyResult(labels);

      tags.push({
        type: 'beds',
        title,
        value: filters.beds,
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
        value: filters.bathrooms,
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
        value: filters.price,
        priority: this.tagPriorities.price
      });
    }

    // move in date tag
    if (filters.moveInDate) {
      tags.push({
        type: 'moveInDate',
        title: 'Move In: ' + formatDate(filters.moveInDate),
        value: filters.moveInDate,
        priority: this.tagPriorities.moveInDate
      });
    }

    // building types
    if (filters.buildingTypes.length) {
      let title = 'Building: ';

      let labels = filters.buildingTypes.map(t => {
        return taxonomy.buildingTypes.find(p => p.id === t)['name'];
      });

      title += this.stringifyResult(labels);

      tags.push({
        type: 'buildingTypes',
        title,
        value: filters.buildingTypes,
        priority: this.tagPriorities.buildingTypes
      });
    }

    // location tags
    if (filters.location.length) {
      let locations = filters.location;

      // determine the "all" regions first
      taxonomy.regions.forEach(region => {
        const regionNeighborhoods = neighborhoodSelectors.getNeighborhoodsByRegionId(region.id, taxonomy.neighborhoods);
        const ids = regionNeighborhoods.map(n => n.id);

        const diff = regionNeighborhoods.filter(n => {
          return !filters.location.includes(n.id);
        });

        if (!diff.length) {
          tags.push({
            type: 'locationAll',
            title: `${region.name}: All`,
            value: ids,
            priority: this.tagPriorities.locationAll
          });

          // remove values from this region from individual tags
          locations = locations.filter(l => {
            return !ids.includes(l);
          });
        }
      });

      // all that remains is individual locations
      locations.forEach(l => {
        const neighborhood = neighborhoodSelectors.getNeighborhoodById(l, taxonomy.neighborhoods);

        if (neighborhood) {
          tags.push({
            type: 'location',
            title: neighborhood.name,
            value: neighborhood.id,
            priority: this.tagPriorities.location
          })
        }
      });
    }

    return tags.sort((a, b): number => {
      let result = a.priority - b.priority;

      if (result !== 0) {
        return result;
      }

      return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
    });
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
