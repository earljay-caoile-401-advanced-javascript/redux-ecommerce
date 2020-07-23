// const initState = {
//   cart: new Map(),
//   cartCount: 0,
// };

// /**
//  * Reducer that handles updating cart state. Part of the mega reducer formed in the index file.
//  * @param {Object} state - initial or current state
//  * @param {Object} action - object containing information to update cart state
//  */
// const cartReducer = (state = initState, action) => {
//   const newState = { ...state };
//   const { type, payload } = action;

//   switch (type) {
//     case 'ADD_TO_CART':
//     case 'INCREMENT_ITEM':
//       if (payload.stock >= 0) {
//         const prevCartObj = newState.cart.get(payload._id);
//         newState.cart.set(payload._id, {
//           ...(prevCartObj || payload),
//           quantity: (prevCartObj ? prevCartObj.quantity : 0) + 1,
//           stock: payload.stock,
//         });
//         newState.cartCount++;
//       }
//       break;
//     case 'DECREMENT_ITEM':
//       const prevCartObj = newState.cart.get(payload._id);
//       if (prevCartObj.quantity === 1) {
//         newState.cart.delete(payload._id);
//       } else {
//         newState.cart.set(payload._id, {
//           ...payload,
//           quantity: prevCartObj.quantity - 1,
//           stock: payload.stock,
//         });
//       }
//       newState.cartCount--;
//       break;
//     case 'DELETE_FROM_CART':
//       newState.cartCount -= action.payload.quantity;
//       newState.cart.delete(action.payload._id);
//       break;
//     case 'DEBUG_RESTOCK':
//       newState.cart = new Map();
//       newState.cartCount = 0;
//       break;
//     default:
//       break;
//   }

//   return newState;
// };

// export default cartReducer;
