import ProductItem from './ProductItem';
import classes from './Products.module.css';
import { productList } from '../utils/constants.js';

const Products = (props) => {
  const renderListCart = () => {
    return productList.map((item, index) => {
      return (
        <ProductItem
          key={index}
          title={item.title}
          price={item.price}
          description={item.description}
          id={item.id}
        />
      );
    });
  };
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>{renderListCart()}</ul>
    </section>
  );
};

export default Products;
