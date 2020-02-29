import { Component, h } from '@stencil/core';

@Component({
  tag: 'booking-tos',
  styleUrl: 'booking-tos.scss'
})
export class BookingTOS {
  render() {
    return (
      <div class="booking-tos-component">
        <p>
          Applicant understands and confirms that in order to take the apartment off the market a down payment
          needs to be made. Applicant is aware APT212 will transfer his down payment to the apartment owner. If
          approved by the owner the down payment is non-refundable and being paid towards the first month rent.
        </p>

        <p>
          The down payment is only refundable to the applicant in the event that the application is rejected by the
          apartment owner. Should the application be rejected by the apartment owner for any reason, a refund
          would be made within 3 business days. Any action taken by the applicant that prevents the signing of a
          rental agreement between the applicant and the owner of the apartment, including an applicantʼs decision
          to withdraw the application for any reason or failure to submit a complete application, with the full
          forfeiture of the down payment. Applicant understands and confirms that a background check in the total
          amount of $100 is paid towards each applicantʼs background check and it is nonrefundable in any case.
        </p>

        <p>
          By checking this box, I confirm that I have read and agree to the terms and conditions.
        </p>
      </div>
    )
  }
}
