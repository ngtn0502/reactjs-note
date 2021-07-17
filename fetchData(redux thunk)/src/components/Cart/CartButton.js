import { useDispatch, useSelector } from 'react-redux';
import { SHOW_MODAL } from '../redux/actions/cart.actions.js';
import classes from './CartButton.module.css';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.cartReducer.product);
  const calcTotal = product.reduce((acc, item) => {
    acc = acc + item.quantity;
    return acc;
  }, 0);
  return (
    <button
      className={classes.button}
      onClick={() => {
        dispatch({
          type: SHOW_MODAL,
        });
      }}
    >
      <span>My Cart</span>
      <span className={classes.badge}>{calcTotal}</span>
    </button>
  );
};

export default CartButton;
