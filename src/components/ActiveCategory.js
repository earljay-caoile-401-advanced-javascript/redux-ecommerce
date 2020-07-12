import React from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import '../styles/categories.scss';

/**
 * Component that renders the name and description of the currently selected category.
 * Grabs the currentCategory state from the Redux store to map state to props.
 *
 * @component
 * @example
 * return (
 *   <ActiveCategory />
 * )
 */
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
