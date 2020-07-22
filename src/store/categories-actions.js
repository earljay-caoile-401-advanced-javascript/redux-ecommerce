import axios from 'axios';

export const get = () => async (dispatch) => {
  const response = await axios.get(
    'https://cf-js-401-api-server.herokuapp.com/api/v1/categories/'
  );
  dispatch(getCategories(response.data.results));
};

const getCategories = (payload) => {
  return {
    type: 'GET_CATEGORIES',
    payload,
  };
};

export const changeCategory = (category) => {
  return {
    type: 'CHANGE_CATEGORY',
    payload: category,
  };
};
