import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const categorySlice = createSlice({
  name: 'categoryStore',

  initialState: {
    categories: [],
    currentCategory: null,
  },

  reducers: {
    getCategories: (state, action) => {
      const { payload } = action;
      state.categories = payload;
      state.currentCategory = payload[0];
    },

    changeCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
});

export const { getCategories, changeCategory } = categorySlice.actions;

export const getAll = () => async (dispatch) => {
  const response = await axios.get(
    'https://cf-js-401-api-server.herokuapp.com/api/v1/categories/'
  );
  dispatch(getCategories(response.data.results));
};

export default categorySlice.reducer;
