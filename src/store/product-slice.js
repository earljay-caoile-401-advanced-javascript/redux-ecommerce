import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import {
  cartIncrement,
  cartDecrement,
  cartDelete,
  cartRestock,
} from '../store/cart-slice.js';

const productSlice = createSlice({
  name: 'productStore',

  initialState: {
    products: new Map(),
    activeProduct: {},
  },

  reducers: {
    getProducts: (state, action) => {
      state.products = new Map(action.payload.map((obj) => [obj._id, obj]));
    },
    incrementItem: (state, action) => {
      const { payload } = action;
      if (payload.stock >= 0) {
        state.products.set(payload._id, payload);
      }
      if (state.activeProduct._id === payload._id) {
        state.activeProduct = payload;
      }
    },
    decrementItem: (state, action) => {
      const { payload } = action;
      state.products.set(payload._id, payload);
      if (state.activeProduct._id === payload._id) {
        state.activeProduct = payload;
      }
    },
    deleteFromCart: (state, action) => {
      const { payload } = action;
      const prevProd = state.products.get(payload._id);
      const newStock = prevProd.stock + payload.quantity;
      state.products.set(payload._id, {
        ...prevProd,
        stock: newStock,
      });

      if (state.activeProduct._id === payload._id) {
        state.activeProduct = { ...payload, stock: newStock };
      }
    },
    getOneProduct: (state, action) => {
      state.activeProduct = action.payload;
    },
    debugRestock: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const {
  getProducts,
  incrementItem,
  decrementItem,
  deleteFromCart,
  getOneProduct,
  debugRestock,
} = productSlice.actions;

const sampleData = require('../data/db.json');

export const getAll = () => async (dispatch) => {
  const response = await axios.get(
    'https://cf-js-401-api-server.herokuapp.com/api/v1/products/'
  );
  dispatch(getProducts(response.data.results));
};

export const getOne = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://cf-js-401-api-server.herokuapp.com/api/v1/products/${id}`
    );
    dispatch(getOneProduct(response.data));
  } catch {
    dispatch(getOneProduct({}));
  }
};

export const increment = (payload) => async (dispatch) => {
  if (payload.stock > 0) {
    const response = await axios.put(
      `https://cf-js-401-api-server.herokuapp.com/api/v1/products/${payload._id}`,
      { ...payload, stock: payload.stock - 1 }
    );
    dispatch(incrementItem(response.data));
    dispatch(cartIncrement(response.data));
  }
};

export const decrement = (payload) => async (dispatch) => {
  const response = await axios.put(
    `https://cf-js-401-api-server.herokuapp.com/api/v1/products/${payload._id}`,
    { ...payload, stock: payload.stock + 1 }
  );
  dispatch(decrementItem(response.data));
  dispatch(cartDecrement(response.data));
};

export const remove = (payload) => async (dispatch) => {
  const response = await axios.put(
    `https://cf-js-401-api-server.herokuapp.com/api/v1/products/${payload._id}`,
    { ...payload, stock: payload.stock + payload.quantity }
  );
  const newPayload = { ...response.data, quantity: payload.quantity };
  dispatch(deleteFromCart(newPayload));
  dispatch(cartDelete(newPayload));
};

export const restock = () => async (dispatch) => {
  const resProds = new Map();

  for (const product of sampleData.products) {
    const response = await axios.put(
      `https://cf-js-401-api-server.herokuapp.com/api/v1/products/${product._id}`,
      {
        category: product.category,
        name: product.displayName,
        description: product.description,
        stock: product.stock,
        price: product.price,
      }
    );

    resProds.set(response.data._id, response.data);
  }

  dispatch(debugRestock(resProds));
  dispatch(cartRestock());
};

export default productSlice.reducer;
