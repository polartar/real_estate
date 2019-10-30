import { Component, h } from '@stencil/core';

@Component({
  tag: 'listing-table',
  styleUrl: 'listing-table.scss'
})
export class ListingTable {

  render() {
    const rows = [];

    for (let i = 0; i < 40; i++) {
      rows.push(<tr>
        <td><apt212-checkbox /></td>
        <td>#12345</td>
        <td>Upper West Side</td>
        <td>351 Prospect Street</td>
        <td>2</td>
        <td>3</td>
        <td>$20,000/month</td>
        <td>Walk Up</td>
        <td>4/17/2019</td>
        <td><ion-button aria-label="View Listing" class="reset" href="/post/12345"><ion-icon src="/assets/images/icons/list_page_arrow.svg" slot="icon-only" /></ion-button></td>
      </tr>);
    }

    return (
      <div class="listing-table-component">
        <table class="listing-table">
          <thead>
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
