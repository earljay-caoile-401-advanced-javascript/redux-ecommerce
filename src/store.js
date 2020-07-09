import { createStore } from 'redux';

const initState = {
  cart: 0,
  categories: [
    { name: 'electronics', displayName: 'Electronics' },
    { name: 'food', displayName: 'Food' },
  ],
  products: [
    {
      name: 'TV',
      description: 'See all the things',
      stock: 5,
      price: 400,
      category: 'electronics',
    },
    {
      name: 'Macbook',
      description: 'Do all the things',
      stock: 7,
      price: 1200,
      category: 'electronics',
    },
    {
      name: 'Carrot',
      description: 'Crunch all the things',
      stock: 25,
      price: 0.3,
      category: 'food',
    },
    {
      name: 'Cake',
      description: 'Lie all the things',
      stock: 10,
      price: 5,
      category: 'food',
    },
  ],
  currentCategory: 'food',
};

const reducer = (state = initState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case 'ADD_TO_CART':
      break;
    case 'CHANGE_CATEGORY':
      newState.currentCategory = action.payload;
      break;
    default:
      break;
  }

  return newState;
};

export default createStore(reducer);
