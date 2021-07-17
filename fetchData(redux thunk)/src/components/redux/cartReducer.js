import {
  ADD_TO_CART,
  INCREASE,
  DECREASE,
  FETCH_DATA,
} from './actions/cart.actions';
import { productList } from '../utils/constants.js';
const init = {
  product: [],
  changed: false,
};

export const cartReducer = (state = init, action) => {
  //
  if (action.type === FETCH_DATA) {
    return {
      product: action.payload || []
    };
  }

  if (action.type === ADD_TO_CART) {
    let product = [...state.product];
    const index = product.findIndex((item) => {
      return item.id === action.payload;
    });
    const item2 = productList.find((item) => {
      return item.id === action.payload;
    });
    if (index === -1) {
      product.push(item2);
    } else {
      product = product.map((item) => {
        if (item.id === action.payload) {
          let newTotal = item.quantity;
          if (item.quantity < item.total) {
            newTotal = item.quantity + 1;
          }
          let newAmount = item.quantity * item.price;
          return { ...item, quantity: newTotal, total: newAmount };
        } else {
          return item;
        }
      });
    }
    return { ...state, product,changed: true };
  }

  //
  if (action.type === INCREASE) {
    let product = [...state.product];
    product = product.map((item) => {
      if (item.id === action.payload) {
        let newTotal = item.quantity;
        if (item.quantity < item.total) {
          newTotal = item.quantity + 1;
        }
        let newAmount = item.quantity * item.price;
        return { ...item, quantity: newTotal, total: newAmount };
      } else {
        return item;
      }
    });
    return { ...state, product,changed: true };
  }

  //
  if (action.type === DECREASE) {
    let product = [...state.product];
    const index = product.findIndex((item) => {
      return item.id === action.payload;
    });
    if (product[index].quantity === 1) {
      product = product.filter((item) => {
        return item.id !== action.payload;
      });
    } else {
      product = product.map((item) => {
        if (item.id === action.payload) {
          let newTotal = item.quantity - 1;
          let newAmount = item.quantity * item.price;
          return { ...item, quantity: newTotal, total: newAmount };
        } else {
          return item;
        }
      });
    }

    return { ...state, product,changed: true };
  }
  return { ...state };
};
