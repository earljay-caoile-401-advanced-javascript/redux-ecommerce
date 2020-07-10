import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Select, MenuItem } from '@material-ui/core';

function Categories(props) {
  const [chosenCategory, setChosenCategory] = useState(
    props.categories[0].name || ''
  );
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
              payload: category.name,
            });
            setChosenCategory(category.name);
          }}
        >
          {category.displayName || category.name}
        </MenuItem>
      );
    });
  }

  return (
    <>
      <h2>Categories</h2>
      <Select value={chosenCategory}>{catsToRender}</Select>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};

export default connect(mapStateToProps)(Categories);
