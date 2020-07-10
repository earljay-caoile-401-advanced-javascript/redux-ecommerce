import { createStore } from 'redux';

const initState = {
  cart: 0,
  categories: [
    { name: 'electronics', displayName: 'Electronics' },
    { name: 'food', displayName: 'Food' },
    {
      name: 'health_house_baby',
      displayName: 'Health, Household, and Baby Care',
    },
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
    {
      category: 'mythical_weapons',
      name: 'mjolnir',
      displayName: 'Mjolnir',
      description:
        "Thor's hammer. It can only be wielded by those who are worthy!",
      id: '5e8bb15065dadc5320959d6c',
    },
    {
      category: 'mythical_weapons',
      name: 'gungnir',
      displayName: 'Gungnir',
      description: "Odin's spear. It supposedly doesn't miss...",
    },
    {
      category: 'health_house_baby',
      name: 'adhesive_medical_strips',
      displayName: 'Adhesive Medical Strips',
      description:
        "We can't use band-aid since that's a copyrighted company name, but that's pretty much what it is...",
    },
    {
      category: 'electronics',
      name: 'amd_ryzen_9_3950x',
      displayName: 'AMD Ryzen 9 3950X',
      description: '16 cores, 32 threads, dank level over 9000!',
    },
    {
      category: 'electronics',
      name: 'intel_core_i9_9900k',
      displayName: 'Intel Core i9-9900k',
      description: "That's a funny way to spell 'Shintel'!",
    },
    {
      category: 'electronics',
      name: 'sennheiser_hd_650',
      displayName: 'Sennheiser HD 650',
      description: 'open cans for dat muzak',
    },
  ],
  currentCategory: 'electronics',
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
