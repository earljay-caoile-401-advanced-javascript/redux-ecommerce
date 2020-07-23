import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cartStore',

  initialState: {
    cart: new Map(),
    cartCount: 0,
  },

  reducers: {
    incrementItem: (state, action) => {
      const { payload } = action;
      const prevCartObj = state.cart.get(payload._id);
      state.cart.set(payload._id, {
        ...(prevCartObj || payload),
        quantity: (prevCartObj ? prevCartObj.quantity : 0) + 1,
        stock: payload.stock,
      });
      state.cartCount++;
    },
    decrementItem: (state, action) => {
      const { payload } = action;
      const prevCartObj = state.cart.get(payload._id);
      if (prevCartObj.quantity === 1) {
        state.cart.delete(payload._id);
      } else {
        state.cart.set(payload._id, {
          ...payload,
          quantity: prevCartObj.quantity - 1,
          stock: payload.stock,
        });
      }
      state.cartCount--;
    },
    deleteFromCart: (state, action) => {
      const { payload } = action;
      state.cartCount -= payload.quantity;
      state.cart.delete(payload._id);
    },
    debugRestock: (state, action) => {
      state.cart = new Map();
      state.cartCount = 0;
    },
  },
});

export const {
  getProducts,
  incrementItem,
  decrementItem,
  deleteFromCart,
  debugRestock,
} = cartSlice.actions;

export default cartSlice.reducer;
