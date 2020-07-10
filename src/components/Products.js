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

function Products(props) {
  const prodsToRender = [];
  const propProds = props.products;

  if (propProds) {
    propProds.forEach((product, i) => {
      if (product.category === props.currentCategory) {
        console.log('current product:', product);
        prodsToRender.push(
          <Grid item xs={12} sm={6} md={4} xl={3} key={i}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={`Image of ${product.displayName || product.name}`}
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.displayName || product.name}
                  </Typography>
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
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      }
    });
  }

  return (
    <>
      <h2>Products</h2>
      <Grid container spacing={4} direction="row" className="prod-grid">
        {prodsToRender}
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    currentCategory: state.currentCategory,
  };
};

export default connect(mapStateToProps)(Products);
