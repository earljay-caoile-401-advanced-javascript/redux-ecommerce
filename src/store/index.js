import { createStore, combineReducers } from 'redux';
import cartStore from './cartStore.js';
import categoryStore from './categoryStore.js';
import productStore from './productStore.js';

/**
 * multi-functional reducer used for components that connect to the Redux store
 * takes current state and updates it based on the action
 * @param {Object} state - state of the Redux store
 * @param {Object} action - object typically containing a type and a payload
 */
const reducers = combineReducers({
  cartStore,
  categoryStore,
  productStore,
});

export default createStore(reducers);
