import { createStore } from 'redux';
const sampleData = require('./data/db.json');

const initState = {
  cart: new Map(),
  cartCount: 0,
  categories: sampleData.categories,
  products: sampleData.products,
  currentCategory: sampleData.categories[0],
};

/**
 * multi-functional reducer used for components that connect to the Redux store
 * takes current state and updates it based on the action
 * @param {Object} state - state of the Redux store
 * @param {Object} action - object typically containing a type and a payload
 */
const reducer = (state = initState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case 'ADD_TO_CART':
      if (action.payload.stock) {
        action.payload.stock--;
        const prevCartObj = newState.cart.get(action.payload._id);
        newState.cart.set(action.payload._id, {
          ...(prevCartObj || action.payload),
          quantity: (prevCartObj ? prevCartObj.quantity : 0) + 1,
        });
      }
      newState.cartCount++;
      break;
    case 'CHANGE_CATEGORY':
      newState.currentCategory = action.payload;
      break;
    case 'INCREMENT_ITEM':
      for (const product of newState.products) {
        if (action.payload._id === product._id) {
          if (product.stock) {
            product.stock--;
            newState.cart.set(action.payload._id, {
              ...action.payload,
              quantity: action.payload.quantity + 1,
            });
            newState.cartCount++;
          }
          break;
        }
      }
      break;
    case 'DECREMENT_ITEM':
      if (action.payload.quantity === 1) {
        newState.cart.delete(action.payload._id);
      } else {
        newState.cart.set(action.payload._id, {
          ...action.payload,
          quantity: action.payload.quantity - 1,
        });
      }

      for (const product of newState.products) {
        if (product._id === action.payload._id) {
          product.stock++;
          break;
        }
      }
      newState.cartCount--;
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
