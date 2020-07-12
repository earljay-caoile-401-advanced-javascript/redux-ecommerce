import { reducer } from '../store';
const sampleData = require('../data/db.json');

describe('reducer', () => {
  it('can change category', () => {
    sampleData.categories.forEach((category) => {
      const newState = reducer(
        {},
        { type: 'CHANGE_CATEGORY', payload: category }
      );
      expect(newState.currentCategory).toBe(category);
    });
  });

  it('can add to cart', () => {
    const newState = reducer(
      {
        cart: [],
      },
      {
        type: 'ADD_TO_CART',
        payload: sampleData.products[0],
      }
    );

    expect(newState.cart).toHaveLength(1);

    const newerState = reducer(newState, {
      type: 'ADD_TO_CART',
      payload: sampleData.products[1],
    });

    expect(newerState.cart).toHaveLength(2);
  });
});
