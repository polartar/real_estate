import { Component, h, Prop, State, Watch, Element } from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import taxonomySelectors from '../../store/selectors/taxonomy';
import { formatMoney, formatDate } from '../../helpers/utils';
import { searchSelectors } from '../../store/selectors/search';
import { setSelectedListings } from '../../store/actions/search';
import Debounce from 'debounce-decorator';

@Component({
  tag: 'listing-table',
  styleUrl: 'listing-table.scss'
})
export class ListingTable {
  @Element() el: HTMLElement;

  @Prop() items: any[] = [];
  @Prop({ context: "store" }) store: Store;
  @State() neighborhoods: any[] = [];
  @State() sortedItems: any[] = [...this.items];
  @State() selectedListings: any[] = [];

  setSelectedListings: Action;
  bedroomTypes: any[] = [];
  buildingTypes: any[] = [];


  @State() sortMap: any = [
    {
      type: 'webId',
      dir: 'asc'
    },
    {
      type: 'neighborhood',
      dir: 'asc'
    },
    {
      type: 'crossStreet',
      dir: 'asc'
    },
    {
      type: 'beds',
      dir: 'asc'
    },
    {
      type: 'baths',
      dir: 'asc'
    },
    {
      type: 'price',
      dir: 'asc'
    },
    {
      type: 'buildingType',
      dir: 'asc'
    },
    {
      type: 'availability',
      dir: 'asc'
    }
  ];

  neighborhoodMap: any = {};

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {

      return {
        neighborhoods: taxonomySelectors.getNeighborhoods(state),
        selectedListings: searchSelectors.getSelectedListings(state),
        buildingTypes: taxonomySelectors.getBuildingTypes(state),
        bedroomTypes: taxonomySelectors.getBedroomTypes(state)
      };
    });

    this.store.mapDispatchToProps(this, {
      setSelectedListings
    });
  }

  componentDidLoad() {
    this.sortItems();
  }

  @Watch('neighborhoods')
  createNeighborhoodMap() {
    this.neighborhoods.forEach(n => {
      this.neighborhoodMap[n.id] = n.name;
    });
  }

  @Watch('items')
  itemsUpdated() {
    this.sortItems();
  }

  @Watch('sortMap')
  sortMapUpdated() {
    this.sortItems();
  }

  sortItems() {
    const sortedItems = this.items.sort((a, b) => {
      let value = 0;

      this.sortMap.forEach(sortItem => {
        if (value !== 0) {
          return;
        }

        value = this.sortItemsBy(a, b, sortItem);
      });

      return value;
    });

    this.sortedItems = [...sortedItems];
  }

  sortItemsBy(a, b, sortMapItem) {
    switch (sortMapItem.type) {
      case 'webId': {
        if (a.id === b.id) { return 0; }

        const result = a.id > b.id ? 1 : -1;

        return sortMapItem.dir === 'asc' ? result : result * -1;
      }


      case 'neighborhood': {
        if (!this.neighborhoods.length) { return 0; }

        if (a.neighborhood_ids[0] === b.neighborhood_ids[0]) { return 0; }

        if (this.neighborhoodMap[a.neighborhood_ids[0]].toLowerCase() > this.neighborhoodMap[b.neighborhood_ids[0]].toLowerCase()) {
          return sortMapItem.dir === 'asc' ? 1 : -1;
        }

        return sortMapItem.dir === 'asc' ? -1 : 1;
      }


      case 'crossStreet': {
        if (a.address.toLowerCase() === b.address.toLowerCase()) { return 0; }

        if (a.address.toLowerCase() > b.address.toLowerCase()) {
          return sortMapItem.dir === 'asc' ? 1 : -1;
        }

        return sortMapItem.dir === 'asc' ? -1 : 1;
      }


      case 'beds': {
        if (a.bedroom_type_id === b.bedroom_type_id) { return 0; }

        const roomscountA = taxonomySelectors.getBedroomTypeById(a.bedroom_type_id, this.bedroomTypes).rooms_count;
        const roomscountB = taxonomySelectors.getBedroomTypeById(b.bedroom_type_id, this.bedroomTypes).rooms_count;

        if (roomscountA > roomscountB) {
          return sortMapItem.dir === 'asc' ? 1 : -1;
        }

        return sortMapItem.dir === 'asc' ? -1 : 1;
      }


      case 'baths': {
        if (a.bathrooms === b.bathrooms) { return 0; }

        if (a.bathrooms > b.bathrooms) {
          return sortMapItem.dir === 'asc' ? 1 : -1;
        }

        return sortMapItem.dir === 'asc' ? -1 : 1;
      }


      case 'price': {
        if (a.rate === b.rate) { return 0; }

        if (a.rate > b.rate) {
          return sortMapItem.dir === 'asc' ? 1 : -1;
        }

        return sortMapItem.dir === 'asc' ? -1 : 1;
      }


      case 'buildingType': {
        if (a.building_type_id === b.building_type_id) { return 0; }

        const nameA = taxonomySelectors.getBuildingTypeById(a.building_type_id, this.buildingTypes).name;
        const nameB = taxonomySelectors.getBuildingTypeById(b.building_type_id, this.buildingTypes).name;

        if (nameA.toLowerCase() > nameB.toLowerCase()) {
          return sortMapItem.dir === 'asc' ? 1 : -1;
        }

        return sortMapItem.dir === 'asc' ? -1 : 1;
      }

      case 'availability': {
        if (a.available_date === b.available_date) { return 0; }

        const aDate = new Date(a.available_date);
        const bDate = new Date(b.available_date);

        if (aDate > bDate) {
          return sortMapItem.dir === 'asc' ? 1 : -1;
        }

        return sortMapItem.dir === 'asc' ? -1 : 1;
      }
    }
  }

  toggleSort(type) {
    let sortMap = [...this.sortMap];

    let currentType = sortMap.find(v => v.type === type);

    // remove the existing setting
    sortMap = sortMap.filter(v => v.type !== type);

    // toggle the direction
    currentType.dir = currentType.dir === 'asc' ? 'desc' : 'asc';

    // put the search type on the top of the stack
    this.sortMap = [currentType, ...sortMap];
  }

  getButtonClass(type) {
    let classObj: any = {
      'button-reset': true,
      'has-icon': true
    }

    let sortType = this.sortMap.filter(v => v.type === type);

    classObj[sortType[0].dir] = true;

    return classObj;
  }

  toggleAll(e) {
    const checkboxes: any = this.el.querySelectorAll('apt212-checkbox.item-checkbox');

    if (checkboxes) {
      if (e.detail.checked) {
        // check all
        checkboxes.forEach(cb => cb.check());
      }
      else {
        checkboxes.forEach(cb => cb.uncheck());
      }
    }
  }

  @Debounce(100)
  checkboxChecked() {
    const checkboxes: any = this.el.querySelectorAll('.item-checkbox');

    const promises = [];
    checkboxes.forEach(cb => {
      promises.push(new Promise(async resolve => {
        const isChecked = await cb.isChecked();

        resolve({
          id: cb.getAttribute('value'),
          checked: isChecked
        });
      }));
    });

    Promise.all(promises).then(result => {
      const value = result.filter(v => v.checked).map(v => parseInt(v.id));

      this.setSelectedListings(value);
    });
  }

  render() {
    const unselected = this.items.filter(v => !this.selectedListings.includes(v.id));

    return (
      <div class="listing-table-component">
        <table class="listing-table">
          <thead class="mobile-only">
            <tr>
              <td>
                <apt212-checkbox checked={!unselected.length} onCheckBoxChange={e => this.toggleAll(e)} />
              </td>
              <td>
                <button class={this.getButtonClass('webId')} aria-label="Sort by Web Id" onClick={() => this.toggleSort('webId')}>
                  Web Id <ion-icon src="/assets/images/icons/page_sort_arrow.svg" />
                </button>
              </td>
              <td>
                <button class={this.getButtonClass('neighborhood')} aria-label="Sort by Neighborhood" onClick={() => this.toggleSort('neighborhood')}>
                  Neighborhood <ion-icon src="/assets/images/icons/page_sort_arrow.svg" />
                </button>
              </td>
              <td>
                <button class={this.getButtonClass('crossStreet')} aria-label="Sort by Cross Street" onClick={() => this.toggleSort('crossStreet')}>
                  Cross Street <ion-icon src="/assets/images/icons/page_sort_arrow.svg" />
                </button>
              </td>
              <td>
                <button class={this.getButtonClass('beds')} aria-label="Sort by Beds" onClick={() => this.toggleSort('beds')}>
                  Beds <ion-icon src="/assets/images/icons/page_sort_arrow.svg" />
                </button>
              </td>
              <td>
                <button class={this.getButtonClass('baths')} aria-label="Sort by Bathroom number" onClick={() => this.toggleSort('baths')}>
                  Bath <ion-icon src="/assets/images/icons/page_sort_arrow.svg" />
                </button>
              </td>
              <td>
                <button class={this.getButtonClass('price')} aria-label="Sort by Price" onClick={() => this.toggleSort('price')}>
                  Price <ion-icon src="/assets/images/icons/page_sort_arrow.svg" />
                </button>
              </td>
              <td>
                <button class={this.getButtonClass('buildingType')} aria-label="Sort by Building Type" onClick={() => this.toggleSort('buildingType')}>
                  Building Type <ion-icon src="/assets/images/icons/page_sort_arrow.svg" />
                </button>
              </td>
              <td>
                <button class={this.getButtonClass('availability')} aria-label="Sort by Available Date" onClick={() => this.toggleSort('availability')}>
                  Available Date <ion-icon src="/assets/images/icons/page_sort_arrow.svg" />
                </button>
              </td>
              <td>
                {/* Placeholder for nav button */}
              </td>
            </tr>
          </thead>
          <tbody>
            {
              this.sortedItems.map(item => {
                const buildingType = taxonomySelectors.getBuildingTypeById(item.building_type_id, this.buildingTypes);
                const bedroomType = taxonomySelectors.getBedroomTypeById(item.bedroom_type_id, this.bedroomTypes);

                return (
                <tr>
                  <td>
                    <apt212-checkbox
                      class="item-checkbox"
                      value={item.id}
                      checked={this.selectedListings.includes(item.id)}
                      onCheckBoxChange={() => this.checkboxChecked()}
                    />
                  </td>
                  <td class="desktop-only">#{ item.id }</td>
                  <td class="desktop-only">{ this.neighborhoodMap[item.neighborhood_ids[0]] }</td>
                  <td class="desktop-only">{item.street_address}</td>
                  <td class="desktop-only">{bedroomType.name}</td>
                  <td class="desktop-only">{item.bathrooms}</td>
                  <td class="desktop-only">{formatMoney(item.rate)}/month</td>
                  <td class="desktop-only">{buildingType.name}</td>
                  <td class="desktop-only">{item.available_date}</td>
                  <td class="mobile-only">
                    <table class="mobile-inner">
                      <tr>
                        <td>
                          { bedroomType.rooms_count > 0 ? `${bedroomType.name} BD` : bedroomType.name } | {item.bathrooms} BA
                        </td>
                        <td>
                          { this.neighborhoodMap[item.neighborhood_ids[0]] }
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="space">
                            {buildingType.name}
                          </div>

                          <div class="space">
                            {formatMoney(item.rate)}/month
                          </div>
                        </td>
                        <td>
                          {item.street_address}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="space no-wrap">
                            Available: {formatDate(new Date(item.available_date), 'm/d/y')}
                          </div>
                        </td>
                        <td>
                          <div class="space">
                            Web ID: #{item.id}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td><ion-button aria-label="View Listing" class="reset view-listing" href={item.url_path}><ion-icon src="/assets/images/icons/list_page_arrow.svg" slot="icon-only" /></ion-button></td>
                </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}
