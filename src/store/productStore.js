const sampleData = require('../data/db.json');

const initState = {
  products: sampleData.products,
};

/**
 * reducer that doesn't seem to require actions because the cart reducer
 * appears to be doing everything
 * @param {Object} state - initial state of the product reducer
 */
const productReducer = (state = initState) => {
  const newState = { ...state };
  return newState;
};

export default productReducer;
