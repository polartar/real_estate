import { Component, h, Prop, Element } from '@stencil/core';
import { Store } from '@stencil/redux';
import bookingSelectors from '../../../store/selectors/booking';
import { formatDate, formatMoney } from '../../../helpers/utils';

@Component({
  tag: 'booking-details',
  styleUrl: 'booking-details.scss'
})
export class BookingDetails {
  @Prop({ context: "store" }) store: Store;
  @Element() el: HTMLElement;
  @Prop() item!: any;

  checkinDate: Date;
  checkoutDate: Date;
  guests: number;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => {
      return {
        checkinDate: bookingSelectors.getCheckinDate(state),
        checkoutDate: bookingSelectors.getCheckoutDate(state),
        guests: bookingSelectors.getGuests(state)
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

  render() {
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

        </div>

        <div class="right">
          <div style={{ width: '100%', height: '200px', background: 'green'}} />
        </div>
      </div>
    )
  }
}
