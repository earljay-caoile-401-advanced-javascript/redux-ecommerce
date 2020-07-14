const initState = {
  cart: new Map(),
  cartCount: 0,
};

const cartReducer = (state = initState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case 'ADD_TO_CART':
      if (action.payload.stock) {
        action.payload.stock--;
        const prevCartObj = newState.cart.get(action.payload._id);
        newState.cart.set(action.payload._id, {
          ...(prevCartObj || action.payload),
          quantity: (prevCartObj ? prevCartObj.quantity : 0) + 1,
        });
        newState.cartCount++;
      }
      break;
    case 'INCREMENT_ITEM':
      if (action.payload.stock) {
        newState.cart.set(action.payload._id, {
          ...action.payload,
          quantity: action.payload.quantity + 1,
          stock: action.payload.stock - 1,
        });
        newState.cartCount++;
      }
      break;
    case 'DECREMENT_ITEM':
      if (action.payload.quantity === 1) {
        newState.cart.delete(action.payload._id);
      } else {
        newState.cart.set(action.payload._id, {
          ...action.payload,
          quantity: action.payload.quantity - 1,
          stock: action.payload.stock + 1,
        });
      }
      newState.cartCount--;
      break;
    case 'DELETE_FROM_CART':
      newState.cart.delete(action.payload._id);
      newState.cartCount -= action.payload.quantity;
      break;
    default:
      break;
  }

  return newState;
};

export const addToCart = (item) => {
  return {
    type: 'ADD_TO_CART',
    payload: item,
  };
};

export const removeFromCart = (item) => {
  return {
    type: 'DELETE_FROM_CART',
    payload: item,
  };
};

export const incrementItem = (item) => {
  return {
    type: 'INCREMENT_ITEM',
    payload: item,
  };
};

export const decrementItem = (item) => {
  return {
    type: 'DECREMENT_ITEM',
    payload: item,
  };
};

export default cartReducer;