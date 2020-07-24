'use strict';

import categoryReducer, {
  getCategories,
  changeCategory,
} from '../store/category-slice.js';
import cartReducer, {
  cartIncrement,
  cartDecrement,
  cartDelete,
} from '../store/cart-slice.js';
import productReducer, {
  getProducts,
  incrementItem,
  decrementItem,
  deleteFromCart,
  getOneProduct,
} from '../store/product-slice.js';
const sampleData = require('../data/db.json');

describe('reducer', () => {
  const productMap = new Map();
  sampleData.products.forEach((product) => {
    productMap.set(product._id, product);
  });

  const incrementHelper = (state, payload) => {
    let resState = cartReducer(
      state,
      cartIncrement(state.cart.get(payload._id) || payload)
    );
    let prevProd = state.products.get(payload._id) || payload;
    resState = productReducer(
      resState,
      incrementItem({
        ...prevProd,
        stock: prevProd.stock - 1,
      })
    );

    return resState;
  };

  const decrementHelper = (state, payload) => {
    let resState = cartReducer(
      state,
      cartDecrement(state.cart.get(payload._id))
    );
    let prevProd = state.products.get(payload._id);
    resState = productReducer(
      resState,
      decrementItem({
        ...prevProd,
        stock: prevProd.stock + 1,
      })
    );

    return resState;
  };

  it('can return a product map after passing in an array of products', () => {
    const newState = productReducer({}, getProducts(sampleData.products));
    expect(newState.products).toMatchObject(productMap);
  });

  it('view one product', () => {
    let newState = productReducer({}, getProducts(sampleData.products));
    newState = productReducer(newState, getOneProduct(sampleData.products[1]));
    expect(newState.activeProduct).toMatchObject(sampleData.products[1]);
  });

  it('can return an array of categories after passing in an array of categories', () => {
    const newState = categoryReducer({}, getCategories(sampleData.categories));
    expect(newState.categories).toMatchObject(sampleData.categories);
  });

  it('can change category', () => {
    sampleData.categories.forEach((category) => {
      const newState = categoryReducer({}, changeCategory(category));
      expect(newState.currentCategory).toBe(category);
    });
  });

  it('can add to cart', () => {
    let newState = cartReducer(
      { cart: new Map(), cartCount: 0 },
      cartIncrement(sampleData.products[0])
    );
    expect(newState.cart.size).toBe(1);
    expect(newState.cartCount).toBe(1);

    newState = cartReducer(newState, cartIncrement(sampleData.products[1]));
    expect(newState.cart.size).toBe(2);
    expect(newState.cartCount).toBe(2);
  });

  it('can increment, decrement, and delete items', () => {
    let newState = incrementHelper(
      {
        cart: new Map(),
        cartCount: 0,
        products: productMap,
        activeProduct: {},
      },
      sampleData.products[0]
    );

    newState = incrementHelper(newState, sampleData.products[1]);
    newState = incrementHelper(newState, sampleData.products[2]);
    expect(newState.cart.size).toBe(3);
    expect(newState.cartCount).toBe(3);

    newState = incrementHelper(newState, sampleData.products[0]);
    expect(newState.cart.size).toBe(3);
    expect(newState.cartCount).toBe(4);

    newState = incrementHelper(newState, sampleData.products[0]);
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

    newState = incrementHelper(newState, sampleData.products[0]);
    expect(newState.cart.size).toBe(3);
    expect(newState.cartCount).toBe(6);

    let itemToDelete = newState.cart.get(sampleData.products[0]._id);
    newState = cartReducer(newState, cartDelete(itemToDelete));
    newState = productReducer(newState, deleteFromCart(itemToDelete));
    expect(newState.cart.size).toBe(2);
    expect(newState.cartCount).toBe(2);

    newState = decrementHelper(newState, sampleData.products[1]);
    expect(newState.cart.size).toBe(1);
    expect(newState.cartCount).toBe(1);

    itemToDelete = newState.cart.get(sampleData.products[2]._id);
    newState = cartReducer(newState, cartDelete(itemToDelete));
    newState = productReducer(newState, deleteFromCart(itemToDelete));
    expect(newState.cart.size).toBe(0);
    expect(newState.cartCount).toBe(0);

    expect(newState.products.get(sampleData.products[2]._id).stock).toBe(
      sampleData.products[2].stock
    );
  });
});
