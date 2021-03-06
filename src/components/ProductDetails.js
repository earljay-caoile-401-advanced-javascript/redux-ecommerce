import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import axios from 'axios';
import {
  Container,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getAll, getOne, increment, restock } from '../store/product-slice.js';

/**
 * Component that serves the enter route for /products/:id. Displays items details and shows related
 * items. Connects to the store in order to retrieve product and cart state
 *
 * @component
 * @example
 * return (
 *   <ProductDetails />
 * )
 */
function ProductDetails(props) {
  const [reqIsPending, setReqIsPending] = useState(false);
  const [fetchingGet, setFetchingGet] = useState(false);
  const [foundError, setFoundError] = useState(false);

  const { activeProduct, getAll, getOne, increment, products } = props;
  const prodID = props.match.params.id;

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
    if (!products || !products.size) {
      getAll();
    }

    getOne(prodID);

    return () => {
      setReqIsPending(false);
      setFetchingGet(false);
      setFoundError(false);
    };
  }, [prodID, products, getAll, getOne]);

  useEffect(() => {
    setFetchingGet(true);
  }, [getAll, getOne]);
  const relatedItems = [];

  if (products) {
    for (const prod of products.values()) {
      if (
        prod._id !== activeProduct._id &&
        prod.category === activeProduct.category
      ) {
        relatedItems.push(
          <Grid item xs={12} sm={6} md={4} key={prod._id}>
            <Link to={`/products/${prod._id}`} className="no-style">
              <CardActionArea
                style={{
                  padding: '1em 0.5em',
                  textAlign: 'center',
                  background: 'teal',
                  color: 'white',
                }}
              >
                <Typography variant="body1">
                  {prod.displayName || prod.name}
                </Typography>
              </CardActionArea>
            </Link>
          </Grid>
        );
      }

      if (relatedItems.length === 3) {
        break;
      }
    }
  }

  return fetchingGet ? (
    <LoadingSpinner loading={fetchingGet} />
  ) : foundError ? (
    <h1>Error</h1>
  ) : activeProduct && activeProduct.name ? (
    <Container>
      <Grid container spacing={4} direction="column" justify="space-between">
        <Grid item style={{ textAlign: 'center' }}>
          <Typography variant="h3">
            {activeProduct.displayName || activeProduct.name}
          </Typography>
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
                style={{ padding: '1em', width: '98%' }}
                image={require(`../assets/${activeProduct.name}.jpg`)}
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
              increment(activeProduct);
            }}
          >
            Add to Cart
          </Button>
        </Grid>
        {relatedItems.length ? (
          <Grid item>
            <Typography variant="h6">Related Items</Typography>
            <br />
            <Grid
              container
              spacing={3}
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              {relatedItems}
            </Grid>
          </Grid>
        ) : null}
        <Grid item>
          <Typography variant="h6" style={{ margin: '1em auto' }}>
            Product Details
          </Typography>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Specifications</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>User Reviews</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Container>
  ) : null;
}

const mapStateToProps = (state) => {
  return {
    products: state.productStore.products,
    activeProduct: state.productStore.activeProduct,
    cartCount: state.cartStore.cartCount,
  };
};

const mapDispatchToProps = {
  getAll,
  getOne,
  increment,
  restock,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
