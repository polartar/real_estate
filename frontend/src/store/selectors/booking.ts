
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
  },

  getBookingDetails: state => {
    if (!state.booking.bookingDetails) {
      return null;
    }

    return {...state.booking.bookingDetails};
  }
}

export default bookingSelectors;
