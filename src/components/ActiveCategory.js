import React from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import '../styles/active-category.scss';

function ActiveCategory(props) {
  return (
    <div id="active-category">
      <Typography variant="h3">
        {(
          props.currentCategory.displayName || props.currentCategory.name
        ).toUpperCase()}
      </Typography>
      <Typography variant="subtitle1">
        {props.currentCategory.description}
      </Typography>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentCategory: state.currentCategory,
  };
};

export default connect(mapStateToProps)(ActiveCategory);
