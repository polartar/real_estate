import { Component, h, Prop, State } from '@stencil/core';
import { Store } from '@stencil/redux';
import { EnvironmentConfigService } from '../../../services/environment/environment-config.service';
import bookingSelectors from '../../../store/selectors/booking';

@Component({
  tag: 'page-booking',
  styleUrl: 'page-booking.scss'
})
export class PageBooking {
  @Prop({ context: "store" }) store: Store;

  @State() details;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        details: bookingSelectors.getBookingDetails(state)
      }
    });

    const rel: any = document.querySelector('link[rel="canonical"]');
    if (rel) {
      rel.setAttribute('href', EnvironmentConfigService.getInstance().get('BASE_URL') + '/booking');
    }
  }

  render() {

    return [
      <app-header hide-search hide-search-button/>,
      <ion-content class="page-404">

        <spinner name="lines" />

        <app-footer />
      </ion-content>
    ];
  }
}
