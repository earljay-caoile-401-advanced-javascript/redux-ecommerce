import axios from 'axios';

export const get = () => async (dispatch) => {
  const response = await axios.get(
    'https://cf-js-401-api-server.herokuapp.com/api/v1/products/'
  );
  dispatch(getProducts(response.data.results));
};

const getProducts = (payload) => {
  return {
    type: 'GET_PRODUCTS',
    payload,
  };
};
