import { Component, h, Prop, State, Watch, Element } from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import neighborhoodSelectors from '../../store/selectors/neighborhoods';
import { getBuildingTypeLabel, getBuildingTypeSortValue, getBedsSortValue } from '../../helpers/filters';
import { formatMoney } from '../../helpers/utils';
import { searchSelectors } from '../../store/selectors/search';
import { setSelectedListing } from '../../store/actions/search';

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

  setSelectedListing: Action;


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
        neighborhoods: neighborhoodSelectors.getNeighborhoods(state),
        selectedListings: searchSelectors.getSelectedListings(state)
      };
    });

    this.store.mapDispatchToProps(this, {
      setSelectedListing
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

        if (a.neighborhood_id === b.neighborhood_id) { return 0; }

        if (this.neighborhoodMap[a.neighborhood_id].toLowerCase() > this.neighborhoodMap[b.neighborhood_id].toLowerCase()) {
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
        if (a.bedrooms === b.bedrooms) { return 0; }

        if (getBedsSortValue(a.bedrooms) > getBedsSortValue(b.bedrooms)) {
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
        if (a.price === b.price) { return 0; }

        if (a.price > b.price) {
          return sortMapItem.dir === 'asc' ? 1 : -1;
        }

        return sortMapItem.dir === 'asc' ? -1 : 1;
      }


      case 'buildingType': {
        if (a.building_type === b.building_type) { return 0; }

        if (getBuildingTypeSortValue(a.building_type) > getBuildingTypeSortValue(b.building_type)) {
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
              this.sortedItems.map(item =>
                <tr>
                  <td>
                    <apt212-checkbox
                      class="item-checkbox"
                      checked={this.selectedListings.includes(item.id)}
                      onCheckBoxChange={e => this.setSelectedListing(item.id, e.detail.checked)}
                    />
                  </td>
                  <td class="desktop-only">#{ item.id }</td>
                  <td class="desktop-only">{ this.neighborhoodMap[item.neighborhood_id] }</td>
                  <td class="desktop-only">{item.address}</td>
                  <td class="desktop-only">{item.bedrooms}</td>
                  <td class="desktop-only">{item.bathrooms}</td>
                  <td class="desktop-only">{formatMoney(item.price)}/month</td>
                  <td class="desktop-only">{getBuildingTypeLabel(item.building_type)}</td>
                  <td class="desktop-only">{item.available_date}</td>
                  <td class="mobile-only">
                    {item.bedrooms} BD | {item.bathrooms} BA<br />
                    {getBuildingTypeLabel(item.building_type)}<br />
                    {formatMoney(item.price)}/month<br />
                    Available: {item.available_date}
                  </td>
                  <td class="mobile-only">
                  { this.neighborhoodMap[item.neighborhood_id] }<br />
                    {item.address}<br /><br />

                    Web ID: #{item.id}
                  </td>
                  <td><ion-button aria-label="View Listing" class="reset" href={`/post/${item.id}`}><ion-icon src="/assets/images/icons/list_page_arrow.svg" slot="icon-only" /></ion-button></td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}
