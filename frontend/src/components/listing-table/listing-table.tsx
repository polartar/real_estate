import { Component, h, Prop, State } from '@stencil/core';
import { Store } from '@stencil/redux';
import neighborhoodSelectors from '../../store/selectors/neighborhoods';
import { getBuildingTypeLabel } from '../../helpers/filters';
import { formatMoney } from '../../helpers/utils';

@Component({
  tag: 'listing-table',
  styleUrl: 'listing-table.scss'
})
export class ListingTable {
  @Prop() items: any[];
  @Prop({ context: "store" }) store: Store;
  @State() neighborhoods: any[] = [];

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {

      return {
        neighborhoods: neighborhoodSelectors.getNeighborhoods(state),
      };
    });
  }

  render() {
    const rows = [];

    this.items.forEach(item => {
      const neighborhood = neighborhoodSelectors.getNeighborhoodById(item.neighborhood_id, this.neighborhoods);

      rows.push(<tr>
        <td><apt212-checkbox /></td>
        <td class="desktop-only">#{ item.id }</td>
        <td class="desktop-only">{neighborhood ? neighborhood.name : 'Neighborhood Unknown'}</td>
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
          {neighborhood ? neighborhood.name : 'Neighborhood Unknown'}<br />
          {item.address}<br /><br />

          Web ID: #{item.id}
        </td>
        <td><ion-button aria-label="View Listing" class="reset" href={`/post/${item.id}`}><ion-icon src="/assets/images/icons/list_page_arrow.svg" slot="icon-only" /></ion-button></td>
      </tr>);
    });

    return (
      <div class="listing-table-component">
        <table class="listing-table">
          <thead class="mobile-only">
            <tr>
              <td>
                <apt212-checkbox />
              </td>
              <td><button class="button-reset has-icon" aria-label="Sort by Web Id">Web Id <ion-icon src="/assets/images/icons/page_sort_arrow.svg" /></button></td>
              <td><button class="button-reset has-icon" aria-label="Sort by Neighborhood">Neighborhood <ion-icon src="/assets/images/icons/page_sort_arrow.svg" /></button></td>
              <td><button class="button-reset has-icon" aria-label="Sort by Cross Street">Cross Street <ion-icon src="/assets/images/icons/page_sort_arrow.svg" /></button></td>
              <td><button class="button-reset has-icon" aria-label="Sort by Beds">Beds <ion-icon src="/assets/images/icons/page_sort_arrow.svg" /></button></td>
              <td><button class="button-reset has-icon" aria-label="Sort by Bathroom number">Bath <ion-icon src="/assets/images/icons/page_sort_arrow.svg" /></button></td>
              <td><button class="button-reset has-icon" aria-label="Sort by Price">Price <ion-icon src="/assets/images/icons/page_sort_arrow.svg" /></button></td>
              <td><button class="button-reset has-icon" aria-label="Sort by Building Type">Building Type <ion-icon src="/assets/images/icons/page_sort_arrow.svg" /></button></td>
              <td><button class="button-reset has-icon" aria-label="Sort by Available Date">Available Date <ion-icon src="/assets/images/icons/page_sort_arrow.svg" /></button></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}
