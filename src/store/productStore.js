const sampleData = require('../data/db.json');

const initState = {
  products: sampleData.products,
};

/**
 * reducer that holds the collection of products and directly updates
 * their stock
 * @param {Object} state - initial state of the product reducer
 */
const productReducer = (state = initState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case 'DESTOCK_FROM_ADD':
    case 'DESTOCK_FROM_UP_ARROW':
      if (action.payload.stock) {
        updateStock(newState.products, action.payload, -1);
      }
      break;
    case 'RESTOCK_FROM_DOWN_ARROW':
      updateStock(newState.products, action.payload, 1);
      break;
    case 'RESTOCK_AFTER_DELETE':
      updateStock(newState.products, action.payload, action.payload.quantity);
      break;
    default:
      break;
  }
  return newState;
};

/**
 * helper function to update product stock
 * @param {Array} products - collection of products
 * @param {Object} payload - paylaod of the cart object to use
 * @param {Number} updateAmt - amount by which to change product stock
 */
const updateStock = (products, payload, updateAmt) => {
  for (const product of products) {
    if (payload._id === product._id) {
      product.stock += updateAmt;
      break;
    }
  }
};

export const decrementFromAdd = (item) => {
  return {
    type: 'DESTOCK_FROM_ADD',
    payload: item,
  };
};

export const decrementFromUpArrow = (item) => {
  return {
    type: 'DESTOCK_FROM_UP_ARROW',
    payload: item,
  };
};

export const incrementFromDownArrow = (item) => {
  return {
    type: 'RESTOCK_FROM_DOWN_ARROW',
    payload: item,
  };
};

export const restockAfterDelete = (item) => {
  return {
    type: 'RESTOCK_AFTER_DELETE',
    payload: item,
  };
};

export default productReducer;
