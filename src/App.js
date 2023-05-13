import React, { useEffect } from 'react';
import './App.css';
import Auth from './components/Auth';
import Layout from './components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './components/Notification';
import { sendCartData } from './store/cart-actions';
import { fetchCartData } from './store/cart-actions';

let isFristRender = true;

function App() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  const cart = useSelector((state) => state.cart);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);

  // const cartItems = useSelector((state) => state.cart.itemsList);
  // console.log(cartItems);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isFristRender) {
      isFristRender = false;
      return;
    }

    cart.changed && dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  return (
    <div className='App'>
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      {isLoggedIn ? <Layout /> : <Auth />}
    </div>
  );
}

export default App;
