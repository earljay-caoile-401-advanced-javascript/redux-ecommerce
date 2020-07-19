import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Select, MenuItem } from '@material-ui/core';
import '../styles/categories.scss';
import * as actions from '../store/categories-actions.js';

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
  const { getCategories } = props;

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const catsToRender = [];
  const propCats = props.categories;

  if (propCats) {
    propCats.forEach((category, i) => {
      catsToRender.push(
        <MenuItem
          className="menu-item"
          value={category.name}
          key={i}
          onClick={() => {
            props.changeCategory(category);
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
      <Select
        value={props.currentCategory ? props.currentCategory.name : ''}
        className="cat-select"
      >
        {catsToRender}
      </Select>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    categories: state.categoryStore.categories,
    currentCategory: state.categoryStore.currentCategory,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCategories: (data) => dispatch(actions.get(data)),
  changeCategory: (data) => dispatch(actions.changeCategory(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
