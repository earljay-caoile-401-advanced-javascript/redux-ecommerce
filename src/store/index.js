import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cart-slice.js';
import productSlice from './product-slice.js';
import categorySlice from './category-slice.js';
import { enableMapSet } from 'immer';
enableMapSet();

const reducers = combineReducers({
  cartStore: cartSlice,
  categoryStore: categorySlice,
  productStore: productSlice,
});

const store = configureStore({ reducer: reducers });

export default store;
