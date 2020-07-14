const sampleData = require('../data/db.json');
const productMap = new Map();

/**
 * Yes, I'm a madman and I put the products into a map instead of using an array.
 * I couldn't resist O(1) lookup
 */
sampleData.products.forEach((product) => {
  productMap.set(product._id, product);
});

const initState = {
  products: productMap,
};

/**
 * reducer that holds the collection of products and directly updates
 * their stock
 * @param {Object} state - initial or current state
 * @param {Object} action - object containing information to update state
 */
const productReducer = (state = initState, action) => {
  const newState = { ...state };
  let prevProd;

  switch (action.type) {
    case 'DESTOCK_FROM_ADD':
    case 'DESTOCK_FROM_UP_ARROW':
      if (action.payload.stock) {
        prevProd = newState.products.get(action.payload._id);
        newState.products.set(action.payload._id, {
          ...prevProd,
          stock: prevProd.stock - 1,
        });
      }
      break;
    case 'RESTOCK_FROM_DOWN_ARROW':
      prevProd = newState.products.get(action.payload._id);
      newState.products.set(action.payload._id, {
        ...prevProd,
        stock: prevProd.stock + 1,
      });
      break;
    case 'RESTOCK_AFTER_DELETE':
      prevProd = newState.products.get(action.payload._id);
      productMap.set(action.payload._id, {
        ...prevProd,
        stock: prevProd.stock + action.payload.quantity,
      });
      break;
    default:
      break;
  }

  return newState;
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
