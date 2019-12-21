import { Component, h, Prop, Element } from '@stencil/core';
import { Store } from '@stencil/redux';
import bookingSelectors from '../../../store/selectors/booking';
import taxonomySelectors from '../../../store/selectors/taxonomy';
import screensizeSelectors from '../../../store/selectors/screensize';
import { formatDate, formatMoney } from '../../../helpers/utils';
import { getBedsListingText } from '../../../helpers/filters';
import { EnvironmentConfigService } from '../../../services/environment/environment-config.service';

declare var window: any;

@Component({
  tag: 'booking-details',
  styleUrl: 'booking-details.scss'
})
export class BookingDetails {
  @Prop({ context: "store" }) store: Store;
  @Element() el: HTMLElement;
  @Prop() item!: any;

  isMobile: boolean = true;
  checkinDate: Date;
  checkoutDate: Date;
  guests: number;
  neighborhoods: any[];
  bedroomTypes: any[];
  buildingTypes: any[];

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        isMobile: screensizeSelectors.getIsMobile(state),
        checkinDate: bookingSelectors.getCheckinDate(state),
        checkoutDate: bookingSelectors.getCheckoutDate(state),
        guests: bookingSelectors.getGuests(state),
        neighborhoods: taxonomySelectors.getNeighborhoods(state),
        bedroomTypes: taxonomySelectors.getBedroomTypes(state),
        buildingTypes: taxonomySelectors.getBuildingTypes(state)
      }
    });
  }

  setTooltip(e) {
    e.stopPropagation();

    const tooltip = e.currentTarget.nextSibling;

    // close other tooltips
    const tooltips = this.el.querySelectorAll('.tooltip.active');
    tooltips.forEach(t => {
      if (t !== tooltip) {
        t.classList.remove('active')
      }
    });

    if (tooltip) {
      tooltip.classList.toggle('active');
      tooltip.style.marginTop = `calc(0px - ${Math.round(tooltip.clientHeight / 2)}px + 8px)`;
    }
  }

  closeTooltips() {
    const tooltips = this.el.querySelectorAll('.tooltip.active');
    tooltips.forEach(t => t.classList.remove('active'));
  }

  shareApartment() {
    const modal = Object.assign(document.createElement('ion-modal'), {
      component: 'apt212-modal-booking-frame',
      cssClass: 'share-listing-modal',
      componentProps: {
        component: 'share-listing',
        componentProps: {
          item: this.item
        }
      }
    });

    document.body.appendChild(modal);
    return modal.present();
  }

  downloadPDF() {
    const apiURL = EnvironmentConfigService.getInstance().get('API_URL');
    const downloadURL = `${apiURL}/pdf/booking-details/${this.item.id}?checkin=${formatDate(this.checkinDate, 'm/d/Y')}&checkout=${formatDate(this.checkoutDate, 'm/d/Y')}&guests=${this.guests}`;

    window.location = downloadURL;
  }

  render() {
    const neighborhood = taxonomySelectors.getNeighborhoodById(this.item.neighborhood_ids[0], this.neighborhoods);
    const bedroomType = taxonomySelectors.getBedroomTypeById(this.item.bedroom_type_id, this.bedroomTypes);
    const buildingType = taxonomySelectors.getBuildingTypeById(this.item.building_type_id, this.buildingTypes);

    const bookingDetails = [
      {
        tooltip: 'Move in date.',
        description: `Check In ${formatDate(this.checkinDate, 'm/d/y')}:`,
        center: <img src="/assets/images/icons/arrow.svg" role="presentation" class="arrow-right" />,
        value: `Check Out ${formatDate(this.checkoutDate, 'm/d/y')}`
      },
      {
        tooltip: 'Price of rent, per month.',
        description: 'Monthly Rent:',
        center: '',
        value: formatMoney(this.item.rate) // @TODO - make this amortized...
      },
      {
        tooltip: 'Price per month, divided by the total amount of days in the month.',
        description: 'Night rate:',
        center: '',
        value: formatMoney(400)
      },
      {
        tooltip: 'Length of your stay, from check-in to check-out.',
        description: 'Total Term:',
        center: '',
        value: '3 Months and 14 days'
      },
      {
        tooltip: 'Total number of guests staying in the apartment',
        description: 'Number of guests:',
        center: '',
        value: this.guests
      }
    ];

    const breakdownDetails = [
      {
        tooltip: 'The cost for a background check, required for all guests to ensure safety.',
        description: 'Background checks:',
        center: '',
        value: formatMoney(300)
      },
      {
        tooltip: 'Sum of (monthly rate x months) + (nightly rate x days).',
        description: 'Rent:',
        center: '',
        value: formatMoney(12000)
      },
      {
        tooltip: 'New York Occupancy & Hotel tax.',
        description: 'Tax:',
        center: '',
        value: formatMoney(543)
      },
      {
        tooltip: 'Sum of your total utilities for the duration of your stay [Utilities includes: Electricity, Gas, Cable TV, Wifi].',
        description: 'Utilities:',
        center: '',
        value: formatMoney(600)
      },
      {
        tooltip: 'Fees help cover Apt212 service costs, including access to a personal agent to assist with the entire rental process, showing units, and processing paperwork.',
        description: 'Service Fee:',
        center: '',
        value: formatMoney(2000)
      },
      {
        tooltip: 'A refundable deposit protects hosts, and guests, from any accidental damages.',
        description: 'Refundable Deposit:',
        center: '',
        value: formatMoney(3000),
        class: 'highlight'
      },
      {
        tooltip: 'The sum of all costs of your rental, from check in to check out.  No hidden fees!',
        description: 'Total:',
        center: '',
        value: formatMoney(19340)
      }
    ];

    const paymentDetails = [
      {
        tooltip: 'Portion of the total due now in order to secure your reservation.',
        description: 'Due now to reserve:',
        center: '',
        value: formatMoney(9000),
        class: 'bg-highlight'
      },
      {
        tooltip: '',
        description: 'Due upon lease signing:',
        center: '',
        value: formatMoney(4000)
      },
      {
        tooltip: 'Portion of the total due by your check in date.',
        description: `Due by check in (${formatDate(this.checkinDate, 'm/d/y')}):`,
        center: '',
        value: formatMoney(9000)
      },
      {
        tooltip: 'Total of all future payments minus the due now and due by check in.  Future payment due dates will be outlined on your lease agreement.',
        description: 'Future Payments:',
        center: '',
        value: formatMoney(-3000)
      },
      {
        tooltip: 'The refundable Deposit that will be paid back to you within a maximum of 14 days from your check out date.',
        description: 'Deposit Refund:',
        center: '',
        value: formatMoney(-3000),
        class: 'highlight'
      }
    ];

    return (
      <ion-content>
      <div class="booking-details-component" onClick={() => this.closeTooltips()}>
        <div class="left">
          <div class="details-section">
            <h3>Booking Details</h3>

            {
              bookingDetails.map(b =>
                <div class="detail-item">
                  <div class="info-wrapper">
                    <button class="button-reset" aria-label="Line item details" onClick={e => this.setTooltip(e)}>
                      <img src="/assets/images/icons/question-circle.svg" alt="info" class="info"/>
                    </button>

                    { b.tooltip.length ?
                      <div class="tooltip">
                        <div class="indicator" />
                        { b.tooltip }
                      </div>
                    : null }
                  </div>

                  <div class="description">
                    {b.description}
                  </div>

                  <div class="center text-center">
                    { b.center }
                  </div>

                  <div class="value">
                    { b.value }
                  </div>
                </div>
              )
            }
          </div>

          <div class="details-section breakdown">
            <h3>Total Breakdown</h3>
            {
              breakdownDetails.map(b => {
                let classObj = { 'detail-item': true };
                if (b.hasOwnProperty('class')) {
                  classObj[b.class] = true;
                }

                return (
                <div class={classObj}>
                  <div class="info-wrapper">
                    <button class="button-reset" aria-label="Line item details" onClick={e => this.setTooltip(e)}>
                      <img src="/assets/images/icons/question-circle.svg" alt="info" class="info"/>
                    </button>

                    { b.tooltip.length ?
                      <div class="tooltip">
                        <div class="indicator" />
                        { b.tooltip }
                      </div>
                    : null }
                  </div>

                  <div class="description">
                    {b.description}
                  </div>

                  <div class="center text-center">
                    { b.center }
                  </div>

                  <div class="value">
                    { b.value }
                  </div>
                </div>
                )
              })
            }
          </div>

          <div class="details-section payment">
            <h3>Payment Timeline</h3>
            {
              paymentDetails.map(b => {
                let classObj = { 'detail-item': true };
                if (b.hasOwnProperty('class')) {
                  classObj[b.class] = true;
                }

                return (
                <div class={classObj}>
                  <div class="info-wrapper">
                    <button class="button-reset" aria-label="Line item details" onClick={e => this.setTooltip(e)}>
                      <img src="/assets/images/icons/question-circle.svg" alt="info" class="info"/>
                    </button>

                    { b.tooltip.length ?
                      <div class="tooltip">
                        <div class="indicator" />
                        { b.tooltip }
                      </div>
                    : null }
                  </div>

                  <div class="description">
                    {b.description}
                  </div>

                  <div class="center text-center">
                    { b.center }
                  </div>

                  <div class="value">
                    { b.value }
                  </div>
                </div>
                )
              })
            }
          </div>

          <div class="guarantee mobile-only">
            <div class="title">
              <lazy-image src="/assets/images/icons/shield_guarantee.svg" />APT212 Tenant Guarantee
            </div>

            <p>
              APT212 vets each hold and property and guarantees each listing is accurate as described.  No Hidden Fees.
            </p>
          </div>

          <div class="action-buttons">
            <button aria-label="Book Now" class="button-dark block">Book Now</button>
            <button aria-label="Ask a question" class="button-light outline block text-upper">Ask a question</button>
          </div>

        </div>

        <div class="right">
          <div class="card">
            {
              this.item.images.length ? <img src={this.item.images[0]} class="feature-image" /> : null
            }

            <div class="card-content">
              <h4>{this.item.cross_streets}</h4>
              <div class="neighborhood">
                { neighborhood.name }
              </div>

              <div class="price">
                { formatMoney(this.item.rate) } /month
              </div>

              <div class="bed-bath">
                <div>
                  <lazy-image src="/assets/images/icons/bedroom.svg" class="bedrooms" alt="bedroom icon" /> {getBedsListingText(bedroomType)}
                </div>
                <div class="divider">
                  |
                </div>
                <div>
                  <lazy-image src="/assets/images/icons/bathroom.svg" class="bathrooms" alt="bathroom icon" /> {this.item.bathrooms} Bathroom
                </div>
              </div>

              <div class="rating-amenities">
                <div class="amenities">
                  { buildingType.name }
                </div>

                <star-rating
                    stars={5}
                    size={this.isMobile ? 10 : 16}
                    rating={this.item.rating}
                    readonly
                />
              </div>

              <div class="webid">
                Web Id #{this.item.id}
              </div>
            </div>
          </div>

          <div class="guarantee desktop-only">
            <div class="title">
              <lazy-image src="/assets/images/icons/shield_guarantee.svg" />APT212 Tenant Guarantee
            </div>

            <p>
              APT212 vets each hold and property and guarantees each listing is accurate as described.  No Hidden Fees.
            </p>
          </div>

          <div class="share-download">
            <button class="button-reset" aria-label="Share" onClick={() => this.shareApartment()}>
              <lazy-image src="/assets/images/icons/share.svg" /> Share
            </button>

            <button class="button-reset" aria-label="Download PDF" onClick={() => this.downloadPDF()}>
            <lazy-image src="/assets/images/icons/pdf.svg" /> Download
            </button>
          </div>
        </div>
      </div>
      </ion-content>
    )
  }
}
