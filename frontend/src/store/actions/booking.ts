import { Actions } from "./index";

export function bookingReset() {
  return async dispatch => {
    dispatch({
      type: Actions.BOOKING_RESET
    });
  };
};

export interface BookingReset {
  type: Actions.BOOKING_RESET;
};

export function bookingSetCheckin(id: number, date: Date) {
  return async dispatch => {
    dispatch({
      type: Actions.BOOKING_SET_CHECKIN_DATE,
      payload: {
        id,
        date
      }
    });
  }
}

export interface BookingSetCheckin {
  type: Actions.BOOKING_SET_CHECKIN_DATE;
  payload: {
    id: number,
    date: Date
  };
}

export function bookingSetCheckout(id: number, date: Date) {
  return async dispatch => {
    dispatch({
      type: Actions.BOOKING_SET_CHECKOUT_DATE,
      payload: {
        id,
        date
      }
    });
  }
}

export interface BookingSetCheckout {
  type: Actions.BOOKING_SET_CHECKOUT_DATE;
  payload: {
    id: number,
    date: Date
  };
}

export function bookingSetGuests(id: number, num: number) {
  return async dispatch => {
    dispatch({
      type: Actions.BOOKING_SET_GUESTS,
      payload: {
        id,
        num
      }
    });
  }
}

export interface BookingSetGuests {
  type: Actions.BOOKING_SET_GUESTS;
  payload: {
    id: number,
    num: number
  };
}

export function bookingSetDetails(details) {
  return async dispatch => {
    dispatch({
      type: Actions.BOOKING_SET_DETAILS,
      payload: details
    })
  };
}

export interface BookingSetDetails {
  type: Actions.BOOKING_SET_DETAILS,
  payload: any
}
