const sampleData = require('../data/db.json');

const initState = {
  products: sampleData.products,
};

/**
 * reducer that doesn't seem to require actions because the cart reducer
 * appears to be doing everything
 * @param {Object} state - initial state of the product reducer
 */
const productReducer = (state = initState, action) => {
  const newState = { ...state };

  console.log('inside productReducer?', action.payload);
  switch (action.type) {
    case 'DESTOCK_FROM_ADD':
      // console.log('What is payload in productReducer?', action.payload);
      for (const product of newState.products) {
        if (action.payload._id === product._id) {
          if (product.stock) {
            product.stock = action.payload.stock;
            console.log('What is product now?', product);
          }
          break;
        }
      }
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

export default productReducer;
