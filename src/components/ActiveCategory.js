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
  // console.log('props?', props);
  const { currentCategory } = props;
  return currentCategory && Object.keys(currentCategory).length ? (
    <div id="active-category">
      <Typography variant="h3">
        {(currentCategory.displayName || currentCategory.name).toUpperCase()}
      </Typography>
      <Typography variant="subtitle1">{currentCategory.description}</Typography>
    </div>
  ) : null;
}

const mapStateToProps = (state) => {
  return {
    currentCategory: state.categoryStore.currentCategory,
  };
};

export default connect(mapStateToProps)(ActiveCategory);
