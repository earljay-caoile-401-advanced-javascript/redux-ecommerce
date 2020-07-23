import React from 'react';
import { connect } from 'react-redux';
import {
  Container,
  // Card,
  // CardActionArea,
  // CardContent,
  // CardMedia,
  // Button,
  Typography,
  // Grid,
} from '@material-ui/core';

function Cart(props) {
  return (
    <Container>
      <Typography variant="h3">Dat Cart Page</Typography>
    </Container>
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
  // getProducts: () => dispatch(actions.get()),
  // getProductDetails: (data) => dispatch(actions.getOne(data)),
  // addToCart: (data) => dispatch(actions.increment(data)),
  // restock: () => dispatch(actions.restock()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
