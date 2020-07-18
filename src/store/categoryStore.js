const sampleData = require('../data/db.json');

const initState = {
  categories: sampleData.categories,
  currentCategory: sampleData.categories[0],
};

/**
 * Reducer that handles updating category state. Part of the mega reducer formed in the index file.
 * @param {Object} state - initial or current state
 * @param {Object} action - object containing information to update category state
 */
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
