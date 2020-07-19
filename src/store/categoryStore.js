const initState = {
  categories: [],
  currentCategory: '',
};

/**
 * Reducer that handles updating category state. Part of the mega reducer formed in the index file.
 * @param {Object} state - initial or current state
 * @param {Object} action - object containing information to update category state
 */
const categoryReducer = (state = initState, action) => {
  const newState = { ...state };
  const { type, payload } = action;

  switch (type) {
    case 'GET_CATEGORIES':
      newState.categories = payload;
      newState.currentCategory = payload[0];
      break;
    case 'CHANGE_CATEGORY':
      newState.currentCategory = action.payload;
      break;
    default:
      break;
  }

  return newState;
};

export default categoryReducer;
