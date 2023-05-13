import { cartActions } from './cart-slice';
import { uiActions } from './ui-slice';

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch(
        'https://redux-http-12ddc-default-rtdb.firebaseio.com/cartItems.json'
      );
      const data = await res.json();
      return data;
    };
    try {
      const cartData = await fetchHandler();
      dispatch(cartActions.replaceData(cartData));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: 'Fetching Data Failed',
          type: 'error',
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        open: true,
        message: 'Sending request...',
        type: 'warning',
      })
    );

    const sendRequest = async () => {
      //Send state as Sending request

      const res = await fetch(
        'https://redux-http-12ddc-default-rtdb.firebaseio.com/cartItems.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );

      const data = await res.json();
      //Send state as Request is successful
      dispatch(
        uiActions.showNotification({
          open: true,
          message: 'Send Request Successfully',
          type: 'success',
        })
      );
    };

    try {
      await sendRequest();
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: 'Send Request Failed',
          type: 'error',
        })
      );
    }
  };
};
