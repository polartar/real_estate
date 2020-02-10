import { ActionTypes, Actions } from "../actions/index";

interface bookingState {
  apartmentId: number | null,
  checkinDate: Date | null,
  checkoutDate: Date | null,
  guests: number | null,
  bookingDetails: object | null
}

const getInitialState = () => {
  return {
    apartmentId: null,
    checkinDate: null,
    checkoutDate: null,
    guests: null,
    bookingDetails: null,
  };
};

const bookingReducer = (
  state: bookingState = getInitialState(),
  action: ActionTypes
) => {
  switch (action.type) {
    case Actions.BOOKING_RESET: {
      return getInitialState();
    }

    case Actions.BOOKING_SET_GUESTS: {
      return {
        ...state,
        apartmentId: action.payload.id,
        guests: action.payload.num
      }
    }

    case Actions.BOOKING_SET_CHECKIN_DATE: {
      return {
        ...state,
        apartmentId: action.payload.id,
        checkinDate: action.payload.date
      }
    }

    case Actions.BOOKING_SET_CHECKOUT_DATE: {
      return {
        ...state,
        apartmentId: action.payload.id,
        checkoutDate: action.payload.date
      }
    }

    case Actions.BOOKING_SET_DETAILS: {
      return {
        ...state,
        bookingDetails: action.payload
      }
    }
  }

  return state;
};


export default bookingReducer;
