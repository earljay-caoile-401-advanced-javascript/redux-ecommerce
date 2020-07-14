const sampleData = require('../data/db.json');

const initState = {
  products: sampleData.products,
};

const productReducer = (state = initState, action) => {
  const newState = { ...state };

  switch (action.type) {
    // case 'ADD_TO_CART':
    //   action.payload.stock--;
    //   break;
    case 'INCREMENT_ITEM':
      for (const product of newState.products) {
        if (action.payload._id === product._id) {
          if (product.stock) {
            product.stock--;
          }
          break;
        }
      }
      break;
    case 'DECREMENT_ITEM':
      for (const product of newState.products) {
        if (product._id === action.payload._id) {
          product.stock++;
          break;
        }
      }
      break;
    case 'DELETE_FROM_CART':
      for (const product of newState.products) {
        if (product._id === action.payload._id) {
          product.stock += action.payload.quantity;
          break;
        }
      }
      break;
    default:
      break;
  }

  return newState;
};

export const lowerStockAfterIncrement = (item) => {
  return {
    type: 'INCREMENT_ITEM',
    payload: item,
  };
};

export const restockAfterDecrement = (item) => {
  return {
    type: 'DECREMENT_ITEM',
    payload: item,
  };
};

export const restockAfterDelete = (item) => {
  return {
    type: 'DELETE_FROM_CART',
    payload: item,
  };
};

export default productReducer;
