/**
 * Yes, I'm a madman and I put the products into a map instead of using an array.
 * I couldn't resist O(1) lookup
 */
const initState = {
  products: new Map(),
};

/**
 * Reducer that handles updating product state. Part of the mega reducer formed in the index file.
 * When using the real app, this reducer automatically gets called when another reducer is called.
 * This allows the cart reducer to be used in other components, but this reducer also gets called. It's magic.
 * @param {Object} state - initial or current state
 * @param {Object} action - object containing information to update product state
 */
const productReducer = (state = initState, action) => {
  const { type, payload } = action;
  const newState = { ...state };
  let prevProd;

  switch (type) {
    case 'GET_PRODUCTS':
      newState.products = new Map(payload.map((obj) => [obj._id, obj]));
      break;
    case 'ADD_TO_CART':
    case 'INCREMENT_ITEM':
      if (payload.stock >= 0) {
        newState.products.set(payload._id, payload);
      }
      break;
    case 'DECREMENT_ITEM':
      newState.products.set(payload._id, payload);
      break;
    case 'DELETE_FROM_CART':
      prevProd = newState.products.get(payload._id);
      newState.products.set(payload._id, {
        ...prevProd,
        stock: prevProd.stock + payload.quantity,
      });
      break;
    case 'DEBUG_RESTOCK':
      newState.products = payload;
      break;
    default:
      break;
  }

  return newState;
};

export default productReducer;
