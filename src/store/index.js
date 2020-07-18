import { createStore, combineReducers } from 'redux';
import cartStore from './cartStore.js';
import categoryStore from './categoryStore.js';
import productStore from './productStore.js';

/**
 * Mother of all reducers that takes child reducers and combines them for use in a React store.
 * Takes current state and updates it based on the action.
 */
const reducers = combineReducers({
  cartStore,
  categoryStore,
  productStore,
});

export default createStore(reducers);
