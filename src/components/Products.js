import React from 'react';
import { connect } from 'react-redux';
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
  const prodsToRender = [];
  const propProds = props.products;

  if (propProds) {
    propProds.forEach((product, i) => {
      if (product.category === props.currentCategory.name) {
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
                  disabled={!product.stock}
                  onClick={() => {
                    props.dispatch({
                      type: 'ADD_TO_CART',
                      payload: product,
                    });
                  }}
                >
                  Add to Cart
                </Button>
                <Button size="small" color="primary">
                  View Details
                </Button>
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
      <Grid container spacing={4} direction="row" className="prod-grid">
        {prodsToRender}
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    currentCategory: state.currentCategory,
    addedItem: state.addedItem,
  };
};

export default connect(mapStateToProps)(Products);
