import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';
import axios from 'axios';
import {
  Container,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
} from '@material-ui/core';
import * as actions from '../store/products-actions';

function ProductDetails(props) {
  const [reqIsPending, setReqIsPending] = useState(false);
  const [fetchingGet, setFetchingGet] = useState(false);
  const [foundError, setFoundError] = useState(false);
  const { activeProduct, location, getProductDetails } = props;

  axios.interceptors.response.use(
    function (response) {
      setReqIsPending(false);
      setFetchingGet(false);
      return response;
    },
    function (error) {
      console.error(error);
      setReqIsPending(false);
      setFetchingGet(false);
      setFoundError(true);
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    setFetchingGet(true);
    getProductDetails(location.pathname);

    return () => {
      setReqIsPending(false);
      setFoundError(false);
    };
  }, [getProductDetails, location.pathname]);

  return fetchingGet ? (
    <LoadingSpinner loading={reqIsPending} />
  ) : foundError ? (
    <h1>Error</h1>
  ) : (
    <Container>
      <Grid
        container
        spacing={4}
        direction="column"
        justify="space-between"
        alignItems="center"
      >
        <Grid item style={{ textAlign: 'center' }}>
          <Typography variant="h3">{activeProduct.name}</Typography>
          <br />
          <Typography variant="h6">{activeProduct.description}</Typography>
        </Grid>
        <Grid item>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                alt={`Image of ${
                  activeProduct.displayName || activeProduct.name
                }`}
                height="600"
                image="https://usatftw.files.wordpress.com/2017/05/spongebob.jpg"
                title={activeProduct.displayName || activeProduct.name}
              />
              <CardContent>
                <Grid container direction="row" justify="space-between">
                  <Typography variant="h6">
                    {activeProduct.stock
                      ? `In Stock: ${activeProduct.stock}`
                      : 'OUT OF STOCK'}
                  </Typography>
                  <Typography variant="h6">
                    {activeProduct.price + ' G'}
                  </Typography>
                </Grid>
              </CardContent>
            </CardActionArea>
            <CardActions></CardActions>
          </Card>
        </Grid>
        <Grid item style={{ width: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={!activeProduct.stock || reqIsPending}
            onClick={() => {
              setReqIsPending(true);
              props.addToCart(activeProduct);
            }}
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.productStore.products,
    activeProduct: state.productStore.activeProduct,
    cartCount: state.cartStore.cartCount,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProductDetails: (data) => dispatch(actions.getOne(data)),
  addToCart: (data) => dispatch(actions.increment(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
