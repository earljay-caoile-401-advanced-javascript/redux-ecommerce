import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

function Categories(props) {
  const catsToRender = [];
  const propCats = props.categories;

  if (propCats) {
    propCats.forEach((category, i) => {
      catsToRender.push(
        <Button
          variant="contained"
          color="secondary"
          key={i}
          onClick={() => {
            props.dispatch({
              type: 'CHANGE_CATEGORY',
              payload: category.name,
            });
          }}
        >
          {category.displayName || category.name}
        </Button>
      );
    });
  }

  return <>{catsToRender}</>;
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};

export default connect(mapStateToProps)(Categories);
