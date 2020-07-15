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
 * Reducer that handles updating product state. Part of the mega reducer formed in the index file
 * When using the real app, this reducer automatically gets called when another reducer is called.
 * This allows the cart reducer to be used in other components, but this reducer also gets called. It's magic.
 * @param {Object} state - initial or current state
 * @param {Object} action - object containing information to update product state
 */
const productReducer = (state = initState, action) => {
  const newState = { ...state };
  let prevProd;

  switch (action.type) {
    case 'ADD_TO_CART':
    case 'INCREMENT_ITEM':
      if (action.payload.stock) {
        prevProd = newState.products.get(action.payload._id);
        newState.products.set(action.payload._id, {
          ...prevProd,
          stock: prevProd.stock - 1,
        });
      }
      break;
    case 'DECREMENT_ITEM':
      prevProd = newState.products.get(action.payload._id);
      newState.products.set(action.payload._id, {
        ...prevProd,
        stock: prevProd.stock + 1,
      });
      break;
    case 'DELETE_FROM_CART':
      prevProd = newState.products.get(action.payload._id);
      newState.products.set(action.payload._id, {
        ...prevProd,
        stock: prevProd.stock + action.payload.quantity,
      });
      break;
    default:
      break;
  }

  return newState;
};

export default productReducer;
