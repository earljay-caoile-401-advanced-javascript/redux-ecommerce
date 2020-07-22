import axios from 'axios';
const sampleData = require('../data/db.json');

export const get = () => async (dispatch) => {
  const response = await axios.get(
    'https://cf-js-401-api-server.herokuapp.com/api/v1/products/'
  );
  dispatch(getProducts(response.data.results));
};

export const increment = (payload) => async (dispatch) => {
  if (payload.stock > 0) {
    const response = await axios.put(
      `https://cf-js-401-api-server.herokuapp.com/api/v1/products/${payload._id}`,
      { ...payload, stock: payload.stock - 1 }
    );
    dispatch(incrementItem(response.data));
  }
};

export const decrement = (payload) => async (dispatch) => {
  const response = await axios.put(
    `https://cf-js-401-api-server.herokuapp.com/api/v1/products/${payload._id}`,
    { ...payload, stock: payload.stock + 1 }
  );
  dispatch(decrementItem(response.data));
};

export const remove = (payload) => async (dispatch) => {
  const response = await axios.put(
    `https://cf-js-401-api-server.herokuapp.com/api/v1/products/${payload._id}`,
    { ...payload, stock: payload.stock + payload.quantity }
  );
  dispatch(deleteFromCart({ ...response.data, quantity: payload.quantity }));
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
};

const getProducts = (payload) => {
  return {
    type: 'GET_PRODUCTS',
    payload,
  };
};

const incrementItem = (payload) => {
  return {
    type: 'INCREMENT_ITEM',
    payload,
  };
};

const decrementItem = (payload) => {
  return {
    type: 'DECREMENT_ITEM',
    payload,
  };
};

const deleteFromCart = (payload) => {
  return {
    type: 'DELETE_FROM_CART',
    payload,
  };
};

const debugRestock = (payload) => {
  return {
    type: 'DEBUG_RESTOCK',
    payload,
  };
};
