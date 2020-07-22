import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
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
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import sampleData from '../data/db.json';
const lastProd = sampleData.products[sampleData.products.length - 1];

/**
 * Component that renders the list of products as cards
 * Grabs the products and currentCategory states from the Redux store to map state to props.
 *
 * @component
 * @example
 * return (
 *   <Products />
 * )
 */
function Products(props) {
  const { getProducts, products, currentCategory } = props;
  const [reqIsPending, setReqIsPending] = useState(false);
  const [fetchingGet, setFetchingGet] = useState(false);

  axios.interceptors.response.use(
    function (response) {
      if (response.data.results) {
        setFetchingGet(false);
      } else if (
        response.data._id &&
        response.data._id === lastProd._id &&
        fetchingGet
      ) {
        setFetchingGet(false);
      } else {
        setReqIsPending(false);
      }
      return response;
    },
    function (error) {
      setReqIsPending(false);
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    getProducts();
    setFetchingGet(true);
  }, [getProducts]);

  const prodsToRender = [];

  if (products) {
    products.forEach((product, i) => {
      if (product.category === currentCategory.name) {
        prodsToRender.push(
          <Grid item xs={12} sm={6} md={4} xl={3} key={i}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={`Image of ${product.displayName || product.name}`}
                  height="140"
                  image="https://usatftw.files.wordpress.com/2017/05/spongebob.jpg?w=1000&h=600&crop=1"
                  title={product.displayName || product.name}
                />
                <CardContent>
                  <Grid container direction="row" justify="space-between">
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.displayName || product.name}
                    </Typography>
                    <Typography>{product.price + ' G'}</Typography>
                  </Grid>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {product.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  disabled={!product.stock || reqIsPending}
                  onClick={() => {
                    setReqIsPending(true);
                    props.addToCart(product);
                  }}
                >
                  Add to Cart
                </Button>
                <Link to={`/products/${product._id}`} className="no-style">
                  <Button size="small" color="primary">
                    View Details
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        );
      }
    });
  }

  return (
    <div id="products" className="cont-child">
      <h2>Products</h2>
      {fetchingGet ? (
        <LoadingSpinner loading={fetchingGet} />
      ) : (
        <>
          <Grid container spacing={4} direction="row" className="prod-grid">
            {prodsToRender}
          </Grid>
          <Button
            className="restock-debug"
            variant="contained"
            color="secondary"
            style={{ margin: '10em auto' }}
            onClick={() => {
              setFetchingGet(true);
              props.restock();
            }}
          >
            Debug Button: Restock Inventory and Clear Cart
          </Button>
        </>
      )}
    </div>
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
  getProducts: () => dispatch(actions.get()),
  getProductDetails: (data) => dispatch(actions.getOne(data)),
  addToCart: (data) => dispatch(actions.increment(data)),
  restock: () => dispatch(actions.restock()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
