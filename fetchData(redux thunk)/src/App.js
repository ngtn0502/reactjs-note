import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Modal from './components/Layout/Modal.js';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import Notification from './components/UI/Notification.js';
import { useEffect } from 'react';
import {
  sendData,
  fetchData,
} from './components/redux/actions/fetch.action.js';

let initial = true;
function App() {
  const isShowModal = useSelector((state) => state.mainReducer.isShowModal);
  const notification = useSelector((state) => state.mainReducer.notification);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.cartReducer.product);
  const changed = useSelector((state) => state.cartReducer.changed);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (initial) {
      initial = false;
      return;
    }
    if (!changed) {
      return;
    }
    dispatch(sendData(product));
  }, [product, dispatch,changed]);

  return (
    <>
      {notification && (
        <Notification notification={notification}></Notification>
      )}
      <Layout>
        {isShowModal && <Modal />}
        <Cart />
        <Products />
      </Layout>
    </>
  );
}

export default App;
