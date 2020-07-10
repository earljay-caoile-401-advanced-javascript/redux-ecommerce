import React from 'react';
import { connect } from 'react-redux';
import { Select, MenuItem } from '@material-ui/core';

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
    <div className="cont-child">
      <h2>Browse our Categories</h2>
      <Select value={props.currentCategory.name} style={{ padding: '0.5em' }}>
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
