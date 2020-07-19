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
      {
        ...sampleData.products[0],
        stock: sampleData.products[0].stock - 1,
      },
      'ADD_TO_CART'
    );

    newState = cartHelper(newState, sampleData.products[1], 'ADD_TO_CART');
    newState = productHelper(
      newState,
      {
        ...sampleData.products[1],
        stock: sampleData.products[1].stock - 1,
      },
      'ADD_TO_CART'
    );
    newState = cartHelper(newState, sampleData.products[2], 'ADD_TO_CART');
    newState = productHelper(
      newState,
      {
        ...sampleData.products[2],
        stock: sampleData.products[2].stock - 1,
      },
      'ADD_TO_CART'
    );
    expect(newState.cart.size).toBe(3);

    newState = cartHelper(
      newState,
      newState.cart.get(sampleData.products[0]._id),
      'INCREMENT_ITEM'
    );

    let prevProd = newState.products.get(sampleData.products[0]._id);
    newState = productHelper(
      newState,
      {
        ...prevProd,
        stock: prevProd.stock - 1,
      },
      'INCREMENT_ITEM'
    );
    expect(newState.cart.size).toBe(3);
    expect(newState.cartCount).toBe(4);

    newState = cartHelper(
      newState,
      newState.cart.get(sampleData.products[0]._id),
      'INCREMENT_ITEM'
    );

    prevProd = newState.products.get(sampleData.products[0]._id);
    newState = productHelper(
      newState,
      {
        ...prevProd,
        stock: prevProd.stock - 1,
      },
      'INCREMENT_ITEM'
    );

    expect(newState.cart.size).toBe(3);
    expect(newState.cartCount).toBe(5);

    expect(newState.products.get(sampleData.products[0]._id).stock).toBe(
      sampleData.products[0].stock - 3
    );
    expect(newState.products.get(sampleData.products[1]._id).stock).toBe(
      sampleData.products[1].stock - 1
    );
    expect(newState.products.get(sampleData.products[2]._id).stock).toBe(
      sampleData.products[2].stock - 1
    );

    newState = cartHelper(
      newState,
      newState.cart.get(sampleData.products[1]._id),
      'INCREMENT_ITEM'
    );
    newState = productHelper(
      newState,
      newState.products.get(sampleData.products[1]._id),
      'INCREMENT_ITEM'
    );
    expect(newState.cart.size).toBe(3);
    expect(newState.cartCount).toBe(6);

    let itemToDelete = { ...newState.cart.get(sampleData.products[0]._id) };
    newState = cartHelper(
      newState,
      newState.cart.get(sampleData.products[0]._id),
      'DELETE_FROM_CART'
    );
    newState = productHelper(newState, itemToDelete, 'DELETE_FROM_CART');
    expect(newState.cart.size).toBe(2);
    expect(newState.cartCount).toBe(3);
    expect(newState.products.get(sampleData.products[0]._id).stock).toBe(
      sampleData.products[0].stock
    );

    newState = cartHelper(
      newState,
      newState.cart.get(sampleData.products[1]._id),
      'DECREMENT_ITEM'
    );
    newState = productHelper(
      newState,
      newState.products.get(sampleData.products[1]._id),
      'DECREMENT_ITEM'
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
      'DECREMENT_ITEM'
    );
    expect(newState.cart.size).toBe(1);
    expect(newState.cartCount).toBe(1);

    itemToDelete = { ...newState.cart.get(sampleData.products[2]._id) };
    newState = cartHelper(
      newState,
      newState.cart.get(sampleData.products[2]._id),
      'DELETE_FROM_CART'
    );
    newState = productHelper(newState, itemToDelete, 'DELETE_FROM_CART');
    expect(newState.cart.size).toBe(0);
    expect(newState.cartCount).toBe(0);
    expect(newState.products.get(sampleData.products[2]._id).stock).toBe(
      sampleData.products[2].stock
    );
  });
});
