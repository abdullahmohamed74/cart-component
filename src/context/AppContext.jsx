import { createContext, useCallback, useEffect, useReducer } from 'react';
import reducer from './reducer';
import {
  CLEAR_CART,
  REMOVE_ITEM,
  INCREASE_AMOUNT,
  DECREASE_AMOUNT,
  LOADING,
  DISPLAY_ITEMS,
} from './actions';
import cartItems from '../components/data';
import useGetCartTotals from '../hooks/useGetCartTotals';

const AppContext = createContext();

function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
    cart: new Map(),
  });

  const { totalPrice, totalAmount } = useGetCartTotals(state.cart);

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: { id } });
  };

  const increaseAmount = (id) => {
    dispatch({ type: INCREASE_AMOUNT, payload: { id } });
  };

  const decreaseAmount = (id) => {
    dispatch({ type: DECREASE_AMOUNT, payload: { id } });
  };

  const fetchData = useCallback(async () => {
    dispatch({ type: LOADING });
    try {
      const response = await fetch(
        'https://www.course-api.com/react-useReducer-cart-project'
      );

      const cart = await response.json();
      dispatch({ type: DISPLAY_ITEMS, payload: { cart } });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increaseAmount,
        decreaseAmount,
        totalPrice,
        totalAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { Provider };
export default AppContext;
