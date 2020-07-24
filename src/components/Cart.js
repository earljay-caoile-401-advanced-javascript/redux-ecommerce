import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Container,
  Button,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  CardMedia,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import '../styles/simpleCart.scss';

const addresses = [
  '1 Material-UI Drive',
  'Reactville',
  'Anytown',
  '99999',
  'USA',
];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

/**
 * Component that serves the enter route for /cart. Displays all the cart details and mocks
 * out shipping and payment info and a place order button. Connects to the store in order to
 * retrieve cart state
 *
 * @component
 * @example
 * return (
 *   <Cart />
 * )
 */
function Cart(props) {
  const classes = useStyles();
  const { cart } = props;

  const itemsToRender = [];
  let totalCost = 0;

  if (cart) {
    cart.forEach((item, id) => {
      // voodoo to avoid weird rounding errors with decimals
      const subtotal = Math.round(item.price * item.quantity * 100) / 100;
      totalCost += subtotal;

      itemsToRender.push(
        <ListItem className={classes.listItem} key={item.name + id}>
          <ListItemText
            primary={item.displayName || item.name}
            secondary={item.description}
          />
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="flex-end"
          >
            <Grid item>
              <Typography variant="body2">{`${item.quantity} x ${item.price} G`}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">{`${subtotal} G`}</Typography>
            </Grid>
          </Grid>
        </ListItem>
      );
    });
  }

  totalCost = Math.round(totalCost * 100) / 100; // doing voodoo again

  return (
    <Container>
      <Typography variant="h3" align="center">
        Cart
      </Typography>
      {cart.size ? (
        <Paper className={classes.paper}>
          <List disablePadding>
            {itemsToRender}
            <Divider />

            <ListItem className={classes.listItem}>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" className={classes.total}>
                {`${totalCost} G`}
              </Typography>
            </ListItem>
          </List>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom className={classes.title}>
                Shipping
              </Typography>
              <Typography gutterBottom>John Smith</Typography>
              <Typography gutterBottom>{addresses.join(', ')}</Typography>
            </Grid>
            <Grid item container direction="column" xs={12} sm={6}>
              <Typography variant="h6" gutterBottom className={classes.title}>
                Payment details
              </Typography>
              <Grid container>
                {payments.map((payment) => (
                  <React.Fragment key={payment.name}>
                    <Grid item xs={6}>
                      <Typography gutterBottom>{payment.name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography gutterBottom>{payment.detail}</Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid container justify="flex-end" style={{ margin: '2em auto 1em' }}>
            <Button variant="contained" color="primary">
              <Typography variant="h6">Place Your Order</Typography>
            </Button>
          </Grid>
        </Paper>
      ) : (
        <Grid
          container
          id="no-items"
          direction="column"
          justify="space-around"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h4">Your cart appears to be empty!</Typography>
          </Grid>
          <Grid item>
            <CardMedia
              component="img"
              alt={`out of stock image`}
              image="https://usatftw.files.wordpress.com/2017/05/spongebob.jpg?w=1000&h=600&crop=1"
              title="empty stock image"
              style={{ margin: '2em auto' }}
            />
          </Grid>
          <Grid item>
            <Link to="/" className="no-style">
              <Button
                variant="contained"
                color="primary"
                className="bigger-back-to-shopping"
              >
                <Typography variant="h6">Return to Shopping</Typography>
              </Button>
            </Link>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cartStore.cart,
    cartCount: state.cartStore.cartCount,
  };
};

export default connect(mapStateToProps)(Cart);
