import { createStore } from 'redux';
const sampleData = require('./data/db.json');

const initState = {
  cart: new Map(),
  cartCount: 0,
  categories: sampleData.categories,
  products: sampleData.products,
  currentCategory: sampleData.categories[0],
};

const reducer = (state = initState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case 'ADD_TO_CART':
      if (action.payload.stock) {
        action.payload.stock--;
        if (newState.cart.has(action.payload._id)) {
          const prevCartObj = newState.cart.get(action.payload._id);
          prevCartObj.quantity++;
        } else {
          newState.cart.set(action.payload._id, {
            ...action.payload,
            quantity: 1,
          });
        }
      }
      newState.cartCount++;
      break;
    case 'CHANGE_CATEGORY':
      newState.currentCategory = action.payload;
      break;
    case 'DELETE_FROM_CART':
      newState.cart.delete(action.payload._id);
      for (const product of newState.products) {
        if (product._id === action.payload._id) {
          product.stock += action.payload.quantity;
          break;
        }
      }
      newState.cartCount -= action.payload.quantity;
      break;
    default:
      break;
  }

  return newState;
};

export default createStore(reducer);
export { reducer };
