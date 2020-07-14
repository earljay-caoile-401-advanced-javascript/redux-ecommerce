'use strict';

import categoryReducer from '../store/categoryStore';
import cartReducer from '../store/cartStore';
import productReducer from '../store/productStore';
const sampleData = require('../data/db.json');

describe('reducer', () => {
  const cartHelper = (state, payload, actionType) => {
    const newState = cartReducer(state, {
      type: actionType,
      payload: payload,
    });

    return newState;
  };

  const productHelper = (state, payload, actionType) => {
    const newState = productReducer(state, {
      type: actionType,
      payload: payload,
    });

    return newState;
  };

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
        cartCount: 0,
      },
      {
        type: 'ADD_TO_CART',
        payload: sampleData.products[0],
      }
    );

    expect(newState.cart.size).toBe(1);

    newState = cartHelper(newState, sampleData.products[1], 'ADD_TO_CART');
    expect(newState.cart.size).toBe(2);
    expect(newState.cartCount).toBe(2);
  });

  it('can increment, decrement, and delete items', () => {
    const productMap = new Map();
    sampleData.products.forEach((product) => {
      productMap.set(product._id, product);
    });

    let newState = cartReducer(
      {
        cart: new Map(),
        cartCount: 0,
        products: productMap,
      },
      {
        type: 'ADD_TO_CART',
        payload: sampleData.products[0],
      }
    );
    newState = productHelper(
      newState,
      sampleData.products[0],
      'DESTOCK_FROM_ADD'
    );

    newState = cartHelper(newState, sampleData.products[1], 'ADD_TO_CART');
    newState = productHelper(
      newState,
      sampleData.products[1],
      'DESTOCK_FROM_ADD'
    );
    newState = cartHelper(newState, sampleData.products[2], 'ADD_TO_CART');
    newState = productHelper(
      newState,
      sampleData.products[2],
      'DESTOCK_FROM_ADD'
    );
    expect(newState.cart.size).toBe(3);

    newState = cartHelper(
      newState,
      newState.cart.get(sampleData.products[0]._id),
      'INCREMENT_ITEM'
    );
    newState = productHelper(
      newState,
      newState.products.get(sampleData.products[0]._id),
      'DESTOCK_FROM_UP_ARROW'
    );
    expect(newState.cart.size).toBe(3);
    expect(newState.cartCount).toBe(4);

    newState = cartHelper(
      newState,
      newState.cart.get(sampleData.products[0]._id),
      'INCREMENT_ITEM'
    );
    newState = productHelper(
      newState,
      newState.products.get(sampleData.products[0]._id),
      'DESTOCK_FROM_UP_ARROW'
    );
    expect(newState.cart.size).toBe(3);
    expect(newState.cartCount).toBe(5);

    newState = cartHelper(
      newState,
      newState.cart.get(sampleData.products[1]._id),
      'INCREMENT_ITEM'
    );
    newState = productHelper(
      newState,
      newState.products.get(sampleData.products[1]._id),
      'DESTOCK_FROM_UP_ARROW'
    );
    expect(newState.cart.size).toBe(3);
    expect(newState.cartCount).toBe(6);

    newState = cartHelper(
      newState,
      newState.cart.get(sampleData.products[0]._id),
      'DELETE_FROM_CART'
    );
    newState = productHelper(
      newState,
      newState.products.get(sampleData.products[0]._id),
      'RESTOCK_AFTER_DELETE'
    );
    expect(newState.cart.size).toBe(2);
    expect(newState.cartCount).toBe(3);

    newState = cartHelper(
      newState,
      newState.cart.get(sampleData.products[1]._id),
      'DECREMENT_ITEM'
    );
    newState = productHelper(
      newState,
      newState.products.get(sampleData.products[1]._id),
      'RESTOCK_FROM_DOWN_ARROW'
    );
    expect(newState.cart.size).toBe(2);
    expect(newState.cartCount).toBe(2);

    newState = cartHelper(
      newState,
      newState.cart.get(sampleData.products[1]._id),
      'DECREMENT_ITEM'
    );
    newState = productHelper(
      newState,
      newState.products.get(sampleData.products[1]._id),
      'RESTOCK_FROM_DOWN_ARROW'
    );
    expect(newState.cart.size).toBe(1);
    expect(newState.cartCount).toBe(1);

    newState = cartHelper(
      newState,
      newState.cart.get(sampleData.products[2]._id),
      'DELETE_FROM_CART'
    );
    newState = productHelper(
      newState,
      newState.products.get(sampleData.products[2]._id),
      'RESTOCK_AFTER_DELETE'
    );
    expect(newState.cart.size).toBe(0);
    expect(newState.cartCount).toBe(0);
  });
});
