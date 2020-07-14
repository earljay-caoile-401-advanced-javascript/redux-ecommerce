const sampleData = require('../data/db.json');

const initState = {
  categories: sampleData.categories,
  currentCategory: sampleData.categories[0],
};

const categoryReducer = (state = initState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case 'CHANGE_CATEGORY':
      newState.currentCategory = action.payload;
      break;
    default:
      break;
  }

  return newState;
};

export const changeCategory = (category) => {
  return {
    type: 'CHANGE_CATEGORY',
    payload: category,
  };
};

export default categoryReducer;
