import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const product = useSelector((state) => state.cartReducer.product);
  const renderListCart = () => {
    return product.map((item, index) => {
      return <CartItem item={item} key={index} />;
    });
  };
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>{renderListCart()}</ul>
    </Card>
  );
};

export default Cart;
