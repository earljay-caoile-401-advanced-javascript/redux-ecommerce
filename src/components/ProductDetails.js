import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  SwipeableDrawer,
} from '@material-ui/core';
import * as actions from '../store/products-actions';

function ProductDetails(props) {
  const [reqIsPending, setReqIsPending] = useState(false);
  const [foundError, setFoundError] = useState(false);
  const { activeProduct, location, getProductDetails } = props;

  axios.interceptors.response.use(
    function (response) {
      setReqIsPending(false);
      return response;
    },
    function (error) {
      console.error(error);
      setReqIsPending(false);
      setFoundError(true);
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    setReqIsPending(true);
    getProductDetails(location.pathname);

    return () => {
      setReqIsPending(false);
      setFoundError(false);
    };
  }, [getProductDetails, location.pathname]);

  return reqIsPending ? (
    <LoadingSpinner loading={reqIsPending} />
  ) : foundError ? (
    <h1>Error</h1>
  ) : (
    <>
      <Typography variant="h3">{activeProduct.name}</Typography>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.productStore.products,
    activeProduct: state.productStore.activeProduct,
    currentCategory: state.categoryStore.currentCategory,
    cartCount: state.cartStore.cartCount,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProductDetails: (data) => dispatch(actions.getOne(data)),
  addToCart: (data) => dispatch(actions.increment(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
