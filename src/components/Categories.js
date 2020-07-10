import React from 'react';
import { connect } from 'react-redux';
import { Select, MenuItem } from '@material-ui/core';
import '../styles/categories.scss';

/**
 * Component that renders the list of categories as a dropdown with a title
 * Grabs the categories and currentCategory states from the Redux store to map state to props.
 *
 * @component
 * @example
 * return (
 *   <Categories />
 * )
 */
function Categories(props) {
  const catsToRender = [];
  const propCats = props.categories;

  if (propCats) {
    propCats.forEach((category, i) => {
      catsToRender.push(
        <MenuItem
          value={category.name}
          key={i}
          onClick={() => {
            props.dispatch({
              type: 'CHANGE_CATEGORY',
              payload: category,
            });
          }}
        >
          {category.displayName || category.name}
        </MenuItem>
      );
    });
  }

  return (
    <div id="categories" className="cont-child">
      <h2>Browse our Categories</h2>
      <Select value={props.currentCategory.name} className="cat-select">
        {catsToRender}
      </Select>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    currentCategory: state.currentCategory,
  };
};

export default connect(mapStateToProps)(Categories);
