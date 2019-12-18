
const bookingSelectors = {
  getBooking: state => {
    return [...state.booking];
  },

  getGuests: state => {
    return state.booking.guests;
  },

  getCheckinDate: state => {
    return state.booking.checkinDate;
  },

  getCheckoutDate: state => {
    return state.booking.checkoutDate;
  },

  getApartmentId: state => {
    return state.booking.apartmentId;
  }
}

export default bookingSelectors;
