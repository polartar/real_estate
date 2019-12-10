import { ActionTypes, Actions } from "../actions/index";

interface wishlistState {
  list: any[]
}

const getInitialState = () => {
  return {
    list: []
  };
};

const wishlistReducer = (
  state: wishlistState = getInitialState(),
  action: ActionTypes
) => {
  switch (action.type) {
    case Actions.ADD_TO_WISHLIST: {
      const list = [...state.list, ...action.payload];

      return {
        ...state,
        list: [...new Set(list)]
      };
    }

    case Actions.REMOVE_FROM_WISHLIST: {
      const list = [...state.list];

      return {
        ...state,
        list: list.filter(v => !action.payload.includes(v))
      };
    }
  }

  return state;
};


export default wishlistReducer;
