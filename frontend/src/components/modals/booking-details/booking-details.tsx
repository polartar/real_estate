import { Component, h, Prop, Element } from '@stencil/core';
import { Store } from '@stencil/redux';
import bookingSelectors from '../../../store/selectors/booking';
import taxonomySelectors from '../../../store/selectors/taxonomy';
import screensizeSelectors from '../../../store/selectors/screensize';
import { formatDate, formatMoney } from '../../../helpers/utils';
import { getBedsListingText } from '../../../helpers/filters';

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
      tooltip.style.marginTop = `calc(0px - ${Math.round(tooltip.clientHeight / 2)}px + 12px)`;
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

  render() {
    const neighborhood = taxonomySelectors.getNeighborhoodById(this.item.neighborhood_ids[0], this.neighborhoods);
    const bedroomType = taxonomySelectors.getBedroomTypeById(this.item.bedroom_type_id, this.bedroomTypes);
    const buildingType = taxonomySelectors.getBuildingTypeById(this.item.building_type_id, this.buildingTypes);

    const bookingDetails = [
      {
        tooltip: '',
        description: `Check In ${formatDate(this.checkinDate, 'm/d/y')}:`,
        center: <img src="/assets/images/icons/arrow.svg" role="presentation" class="arrow-right" />,
        value: `Check Out ${formatDate(this.checkoutDate, 'm/d/y')}`
      },
      {
        tooltip: 'Monthly rent is the amortized rent when the duration spans different seasonal rates',
        description: 'Monthly Rent:',
        center: '',
        value: formatMoney(this.item.rate) // @TODO - make this amortized...
      },
      {
        tooltip: 'Night rate is determined as the average rate over the duration when it spans different seasonal rates.  eg. Total cost / number of days',
        description: 'Night rate:',
        center: '',
        value: formatMoney(400)
      },
      {
        tooltip: '',
        description: 'Total Term:',
        center: '',
        value: '3 Months and 14 days'
      },
      {
        tooltip: '',
        description: 'Number of guests:',
        center: '',
        value: this.guests
      }
    ];

    const breakdownDetails = [
      {
        tooltip: '',
        description: 'Background checks:',
        center: '',
        value: formatMoney(300)
      },
      {
        tooltip: '',
        description: 'Rent:',
        center: '',
        value: formatMoney(12000)
      },
      {
        tooltip: '',
        description: 'Tax:',
        center: '',
        value: formatMoney(543)
      },
      {
        tooltip: 'Power, water, heat, etc.',
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
        tooltip: '',
        description: 'Refundable Deposit:',
        center: '',
        value: formatMoney(3000)
      },
      {
        tooltip: '',
        description: 'Total:',
        center: '',
        value: formatMoney(19340)
      }
    ];

    const paymentDetails = [
      {
        tooltip: '',
        description: 'Due now to reserve:',
        center: '',
        value: formatMoney(9000)
      },
      {
        tooltip: '',
        description: 'Due upon lease signing:',
        center: '',
        value: formatMoney(4000)
      },
      {
        tooltip: '',
        description: `Due by check in (${formatDate(this.checkinDate, 'm/d/y')}):`,
        center: '',
        value: formatMoney(9000)
      },
      {
        tooltip: '',
        description: 'Future Payments:',
        center: '',
        value: formatMoney(-3000)
      },
      {
        tooltip: '',
        description: 'Deposit Refund:',
        center: '',
        value: formatMoney(-3000)
      }
    ];

    return (
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
              breakdownDetails.map(b =>
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

          <div class="details-section payment">
            <h3>Payment Timeline</h3>
            {
              paymentDetails.map(b =>
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

          <div class="action-buttons">
            <button aria-label="Book Now" class="button-dark block">Book Now</button>
            <button aria-label="Ask a question" class="button-light outline block text-upper">Ask a question</button>
          </div>

        </div>

        <div class="right">
          <div class="card">
            <img src={this.item.images[0]} class="feature-image" />

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

          <div class="guarantee">
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

            <button class="button-reset">
            <lazy-image src="/assets/images/icons/pdf.svg" /> Download
            </button>
          </div>
        </div>
      </div>
    )
  }
}
