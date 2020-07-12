import { createStore } from 'redux';
const sampleData = require('./data/db.json');

const initState = {
  cart: [],
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
        newState.cart.push(action.payload);
      }
      break;
    case 'CHANGE_CATEGORY':
      newState.currentCategory = action.payload;
      break;
    default:
      break;
  }

  return newState;
};

export default createStore(reducer);
export { reducer };
