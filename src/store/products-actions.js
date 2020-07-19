import axios from 'axios';

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

const getProducts = (payload) => {
  return {
    type: 'GET_PRODUCTS',
    payload,
  };
};

const incrementItem = (item) => {
  return {
    type: 'INCREMENT_ITEM',
    payload: item,
  };
};

const decrementItem = (item) => {
  return {
    type: 'DECREMENT_ITEM',
    payload: item,
  };
};

const deleteFromCart = (item) => {
  return {
    type: 'DELETE_FROM_CART',
    payload: item,
  };
};
