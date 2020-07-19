const initState = {
  cart: new Map(),
  cartCount: 0,
};

/**
 * Reducer that handles updating cart state. Part of the mega reducer formed in the index file.
 * @param {Object} state - initial or current state
 * @param {Object} action - object containing information to update cart state
 */
const cartReducer = (state = initState, action) => {
  const newState = { ...state };
  const { type, payload } = action;

  switch (type) {
    case 'ADD_TO_CART':
    case 'INCREMENT_ITEM':
      console.log('What is payload stock?', payload.stock);
      if (payload.stock >= 0) {
        const prevCartObj = newState.cart.get(payload._id);
        newState.cart.set(action.payload._id, {
          ...(prevCartObj || payload),
          quantity: (prevCartObj ? prevCartObj.quantity : 0) + 1,
          stock: payload.stock,
        });
        newState.cartCount++;
      }
      break;
    case 'DECREMENT_ITEM':
      const prevCartObj = newState.cart.get(payload._id);
      if (prevCartObj.quantity === 1) {
        newState.cart.delete(payload._id);
      } else {
        newState.cart.set(payload._id, {
          ...payload,
          quantity: prevCartObj.quantity - 1,
          stock: payload.stock,
        });
      }
      newState.cartCount--;
      break;
    case 'DELETE_FROM_CART':
      newState.cartCount -= action.payload.quantity;
      newState.cart.delete(action.payload._id);
      break;
    default:
      break;
  }

  return newState;
};

// export const addToCart = (item) => {
//   return {
//     type: 'ADD_TO_CART',
//     payload: item,
//   };
// };

// export const removeFromCart = (item) => {
//   return {
//     type: 'DELETE_FROM_CART',
//     payload: item,
//   };
// };

// export const incrementItem = (item) => {
//   return {
//     type: 'INCREMENT_ITEM',
//     payload: item,
//   };
// };

// export const decrementItem = (item) => {
//   return {
//     type: 'DECREMENT_ITEM',
//     payload: item,
//   };
// };

export default cartReducer;
