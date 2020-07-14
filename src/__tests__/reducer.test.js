'use strict';

import categoryReducer from '../store/categoryStore';
import cartReducer from '../store/cartStore';
const sampleData = require('../data/db.json');

describe('reducer', () => {
  it('can change category', () => {
    sampleData.categories.forEach((category) => {
      const newState = categoryReducer(
        {},
        { type: 'CHANGE_CATEGORY', payload: category }
      );
      expect(newState.currentCategory).toBe(category);
    });
  });

  it('can add to cart', () => {
    let newState = cartReducer(
      {
        cart: new Map(),
      },
      {
        type: 'ADD_TO_CART',
        payload: sampleData.products[0],
      }
    );

    expect(newState.cart.size).toBe(1);

    newState = cartReducer(newState, {
      type: 'ADD_TO_CART',
      payload: sampleData.products[1],
    });

    expect(newState.cart.size).toBe(2);
  });
});
