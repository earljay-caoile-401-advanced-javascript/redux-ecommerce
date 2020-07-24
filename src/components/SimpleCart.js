import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Drawer,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Grid,
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CakeIcon from '@material-ui/icons/Cake';
import DevicesIcon from '@material-ui/icons/Devices';
import HealingIcon from '@material-ui/icons/Healing';
import HelpIcon from '@material-ui/icons/Help';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ColorizeIcon from '@material-ui/icons/Colorize';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import '../styles/simpleCart.scss';
// import * as actions from '../store/products-actions';
import { increment, decrement, remove } from '../store/product-slice.js';

import axios from 'axios';

/**
 * Component that renders a list of cart items. Allows users to increment, decrement, and delete
 * @param {Object} props - props passed on from the Header component
 */
function SimpleCart(props) {
  const [reqIsPending, setReqIsPending] = useState(false);
  const { cart, increment, decrement, remove } = props;

  axios.interceptors.response.use(
    function (response) {
      setReqIsPending(false);
      return response;
    },
    function (error) {
      setReqIsPending(false);
      return Promise.reject(error);
    }
  );

  const cartListToRender = [];

  let totalCost = 0;
  if (cart) {
    cart.forEach((item, key) => {
      let itemIcon;
      switch (item.category) {
        case 'mythical_weapons':
          itemIcon = <ColorizeIcon />;
          break;
        case 'health_house_baby':
          itemIcon = <HealingIcon />;
          break;
        case 'electronics':
          itemIcon = <DevicesIcon />;
          break;
        case 'food':
          itemIcon = <CakeIcon />;
          break;
        default:
          itemIcon = <HelpIcon />;
          break;
      }

      totalCost += item.price * item.quantity;

      cartListToRender.push(
        <ListItem key={key} className="fade-in">
          <ListItemIcon>{itemIcon}</ListItemIcon>
          <ListItemText
            primary={item.displayName || item.name}
            secondary={item.quantity}
          />
          <Button
            disabled={!item.stock || reqIsPending}
            onClick={() => {
              setReqIsPending(true);
              increment(item);
            }}
          >
            <ArrowUpwardIcon className="item-change" />
          </Button>
          <Button
            disabled={reqIsPending}
            onClick={() => {
              setReqIsPending(true);
              decrement(item);
            }}
          >
            <ArrowDownwardIcon className="item-change" />
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              remove(item);
            }}
          >
            <DeleteForeverIcon />
          </Button>
        </ListItem>
      );
    });
  }

  totalCost = Math.round(totalCost * 100) / 100; // voodoo to avoid weird rounding errors with decimals

  return (
    <Drawer
      id="simple-cart"
      className={props.classes.drawer}
      variant="persistent"
      anchor="right"
      open={props.openRight}
      classes={{
        paper: props.classes.drawerPaper,
      }}
    >
      <div className={props.classes.drawerHeader} id="cart-list-header">
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Typography variant="h6">Cart Items</Typography>
          <Typography variant="subtitle2">
            {cartListToRender.length ? `Subtotal: ${totalCost} G` : null}
          </Typography>
        </Grid>
      </div>
      <Divider />
      {cartListToRender.length ? (
        <List id="cart-list-body">{cartListToRender}</List>
      ) : (
        <Grid
          container
          id="no-items"
          direction="column"
          justify="space-around"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h5">Your cart appears to be empty!</Typography>
          </Grid>
          <Grid item>
            <SentimentVeryDissatisfiedIcon className="big-smiley" />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => props.setOpenRight(false)}
              className="back-to-shopping-btn"
            >
              <ArrowBackIcon />
              <Typography variant="h6">Return to Shopping</Typography>
            </Button>
          </Grid>
        </Grid>
      )}
    </Drawer>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cartStore.cart,
    cartCount: state.cartStore.cartCount,
  };
};

// const mapDispatchToProps = (dispatch) => ({
//   incrementItem: (data) => dispatch(actions.increment(data)),
//   decrementItem: (data) => dispatch(actions.decrement(data)),
//   removeItem: (data) => dispatch(actions.remove(data)),
// });

const mapDispatchToProps = {
  increment,
  decrement,
  remove,
};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleCart);
