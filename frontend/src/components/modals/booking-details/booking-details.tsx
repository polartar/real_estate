import { Component, h, Prop, Element, State } from '@stencil/core';
import { Store } from '@stencil/redux';
import bookingSelectors from '../../../store/selectors/booking';
import taxonomySelectors from '../../../store/selectors/taxonomy';
import screensizeSelectors from '../../../store/selectors/screensize';
import { formatDate, formatMoney } from '../../../helpers/utils';
import { getBedsListingText } from '../../../helpers/filters';
import { EnvironmentConfigService } from '../../../services/environment/environment-config.service';
import { RouterService } from '../../../services/router.service';
import { ModalService } from '../../../services/modal.service';

declare var window: any;

@Component({
  tag: 'booking-details',
  styleUrl: 'booking-details.scss'
})
export class BookingDetails {
  @Prop({ context: "store" }) store: Store;
  @Element() el: HTMLElement;
  @Prop() item!: any;

  @State() details: any = null;

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
        details: bookingSelectors.getBookingDetails(state),
        neighborhoods: taxonomySelectors.getNeighborhoods(state),
        bedroomTypes: taxonomySelectors.getBedroomTypes(state),
        buildingTypes: taxonomySelectors.getBuildingTypes(state),
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
          items: [this.item]
        }
      }
    });

    document.body.appendChild(modal);
    return modal.present();
  }

  downloadPDF() {
    const apiURL = EnvironmentConfigService.getInstance().get('API_URL');
    const downloadURL = `${apiURL}/pdf/booking-details/${this.item.id}?checkindate=${formatDate(this.checkinDate, 'm/d/Y')}&checkoutdate=${formatDate(this.checkoutDate, 'm/d/Y')}&guests=${this.guests}`;

    window.location = downloadURL;
  }

  showAskQuestion() {
    return ModalService.contactUs(this.item);
  }

  bookNow() {
    RouterService.forward('booking');

    const modal: any = this.el.closest('ion-modal');
    if (modal) {
      modal.dismiss();
    }
  }

  render() {
    if (!this.details) {
      return <ion-spinner name="lines" />
    }

    const neighborhood = taxonomySelectors.getNeighborhoodById(this.item.neighborhood_ids[0], this.neighborhoods);
    const bedroomType = taxonomySelectors.getBedroomTypeById(this.item.bedroom_type_id, this.bedroomTypes);
    const buildingType = taxonomySelectors.getBuildingTypeById(this.item.building_type_id, this.buildingTypes);

    let termString = this.details.term.months ? `${this.details.term.months} months` : '';
    if (this.details.term.months && this.details.term.days) {
      termString += ' and ';
    }

    if (this.details.term.days) {
      termString += `${this.details.term.days} days`
    }

    const bookingDetails = [
      {
        tooltip: 'Move in date.',
        description: `Check In ${this.details.checkindate}:`,
        center: <img src="/assets/images/icons/arrow.svg" role="presentation" class="arrow-right" />,
        value: `Check Out ${this.details.checkoutdate}`
      },
      {
        tooltip: 'Price of rent, per month.',
        description: 'Monthly Rent:',
        center: '',
        value: this.details.monthly_rent ? formatMoney(this.details.monthly_rent) : null
      },
      {
        tooltip: 'Price per month, divided by the total amount of days in the month.',
        description: 'Night rate:',
        center: '',
        value: this.details.night_rate ? formatMoney(this.details.night_rate, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : null
      },
      {
        tooltip: 'Length of your stay, from check-in to check-out.',
        description: 'Total Term:',
        center: '',
        value: termString
      },
      {
        tooltip: 'Total number of guests staying in the apartment',
        description: 'Number of guests:',
        center: '',
        value: this.details.guests
      }
    ];

    const breakdownDetails = [
      {
        tooltip: 'The cost for a background check, required for all guests to ensure safety.',
        description: 'Background checks:',
        center: '',
        value: this.details.background_checks ? formatMoney(this.details.background_checks) : null
      },
      {
        tooltip: 'Sum of (monthly rate x months) + (nightly rate x days).',
        description: 'Rent:',
        center: '',
        value: this.details.rent ? formatMoney(this.details.rent) : null
      },
      {
        tooltip: 'New York Occupancy & Hotel tax.',
        description: 'Tax:',
        center: '',
        value: this.details.tax ? formatMoney(this.details.tax) : null
      },
      {
        tooltip: 'Sum of your total utilities for the duration of your stay [Utilities includes: Electricity, Gas, Cable TV, Wifi].',
        description: 'Utilities:',
        center: '',
        value: this.details.utilities ? formatMoney(this.details.utilities) : null
      },
      {
        tooltip: 'Fees help cover Apt212 service costs, including access to a personal agent to assist with the entire rental process, showing units, and processing paperwork.',
        description: 'Service Fee:',
        center: '',
        value: this.details.service_fee ? formatMoney(this.details.service_fee) : null
      },
      {
        tooltip: 'A refundable deposit protects hosts, and guests, from any accidental damages.',
        description: 'Refundable Deposit:',
        center: '',
        value: this.details.deposit ? formatMoney(this.details.deposit) : null,
        class: 'highlight'
      },
      {
        tooltip: 'The sum of all costs of your rental, from check in to check out.  No hidden fees!',
        description: 'Total:',
        center: '',
        value: this.details.total ? formatMoney(this.details.total) : null
      }
    ];

    const paymentDetails = [
      {
        tooltip: 'Portion of the total due now in order to secure your reservation.',
        description: 'Due now to reserve:',
        center: '',
        value: this.details.timeline.due_to_reserve ? formatMoney(this.details.timeline.due_to_reserve) : null,
        class: 'bg-highlight'
      },
      {
        tooltip: 'Portion of the total due by your check in date.',
        description: `Due by check in (${this.details.timeline.due_by_checkin_date}):`,
        center: '',
        value: this.details.timeline.due_by_checkin ? formatMoney(this.details.timeline.due_by_checkin) : null
      },
      {
        tooltip: 'Total of all future payments minus the due now and due by check in.  Future payment due dates will be outlined on your lease agreement.',
        description: 'Future Payments:',
        center: '',
        value: this.details.timeline.future_payments ? formatMoney(this.details.timeline.future_payments) : null
      },
      {
        tooltip: 'The refundable Deposit that will be paid back to you within a maximum of 14 days from your check out date.',
        description: `Deposit Refund (${this.details.timeline.deposit_refund_date}):`,
        center: '',
        value: this.details.timeline.deposit_refund ? formatMoney(this.details.timeline.deposit_refund) : null,
        class: 'highlight'
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
              breakdownDetails.map(b => {
                if (!b.value) {
                  return;
                }

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
                if (!b.value) {
                  return;
                }

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
            <button aria-label="Book Now" class="button-dark block" onClick={() => this.bookNow()}>Book Now</button>
            <button aria-label="Ask a question" class="button-light outline block text-upper" onClick={() => this.showAskQuestion()}>Ask a question</button>
          </div>

        </div>

        <div class="right">
          <div class="card">
            {
              this.item.images.length ? <img src={this.item.images[0].small} class="feature-image" /> : null
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
                  <lazy-image src="/assets/images/icons/bedroom.svg" class="bedrooms" alt="bedroom" /> {getBedsListingText(bedroomType)}
                </div>
                <div class="divider">
                  |
                </div>
                <div>
                  <lazy-image src="/assets/images/icons/bathroom.svg" class="bathrooms" alt="bathroom" /> {this.item.bathrooms} Bathroom
                </div>
              </div>

              <div class="rating-amenities">
                <div class="amenities">
                  { buildingType.name }
                </div>

                <star-rating
                    stars={5}
                    size={this.isMobile ? 10 : 16}
                    rating={buildingType.rating}
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
    )
  }
}
