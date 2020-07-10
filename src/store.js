import { createStore } from 'redux';
const sampleData = require('./data/db.json');

const initState = {
  cart: 0,
  categories: sampleData.categories,
  products: sampleData.products,
  currentCategory: sampleData.categories[0],
};

const reducer = (state = initState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case 'ADD_TO_CART':
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
