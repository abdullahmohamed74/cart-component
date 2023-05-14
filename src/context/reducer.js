import {
  CLEAR_CART,
  REMOVE_ITEM,
  INCREASE_AMOUNT,
  DECREASE_AMOUNT,
  LOADING,
  DISPLAY_ITEMS,
} from './actions';

function reducer(state, action) {
  // clear all the items from the cart
  if (action.type === CLEAR_CART) {
    return { ...state, cart: new Map() };
  }

  // delete one item of a specific id from the cart
  if (action.type === REMOVE_ITEM) {
    const updatedCart = new Map(state.cart);
    updatedCart.delete(action.payload.id);

    return { ...state, cart: updatedCart };
  }

  // increase amount of one item of a specific id
  if (action.type === INCREASE_AMOUNT) {
    const updatedCart = new Map(state.cart);
    const item = updatedCart.get(action.payload.id);

    const updatedItem = { ...item, amount: item.amount + 1 };
    updatedCart.set(action.payload.id, updatedItem);

    return { ...state, cart: updatedCart };
  }

  // decrease amount of one item of a specific id
  if (action.type === DECREASE_AMOUNT) {
    const updatedCart = new Map(state.cart);
    const item = updatedCart.get(action.payload.id);

    const updatedItem = { ...item, amount: item.amount - 1 };

    if (updatedItem.amount === 0) {
      updatedCart.delete(action.payload.id);
      return { ...state, cart: updatedCart };
    }

    updatedCart.set(action.payload.id, updatedItem);
    return { ...state, cart: updatedCart };
  }

  // set isLoading true before sending the request
  if (action.type === LOADING) {
    return { ...state, isLoading: true };
  }

  // set isLoading false after geting the data
  // set cart to the new data
  if (action.type === DISPLAY_ITEMS) {
    const updatedCart = new Map(
      action.payload.cart.map((item) => [item.id, item])
    );
    return { ...state, isLoading: false, cart: updatedCart };
  }

  throw new Error(`No matching action type:"${action.type}"`);
}

export default reducer;
