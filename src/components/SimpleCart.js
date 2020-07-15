import React from 'react';
import { connect } from 'react-redux';
import {
  Drawer,
  IconButton,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Grid,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CakeIcon from '@material-ui/icons/Cake';
import DevicesIcon from '@material-ui/icons/Devices';
import HealingIcon from '@material-ui/icons/Healing';
import HelpIcon from '@material-ui/icons/Help';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ColorizeIcon from '@material-ui/icons/Colorize';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import {
  removeFromCart,
  incrementItem,
  decrementItem,
} from '../store/cartStore';
import {
  decrementFromUpArrow,
  incrementFromDownArrow,
  restockAfterDelete,
} from '../store/productStore';

/**
 * Component that renders a list of cart items. Allows users to increment, decrement, and delete
 * @param {Object} props - props passed on from the Header component
 */
function SimpleCart(props) {
  const cartListToRender = [];
  const propCart = props.cart;

  let totalCost = 0;
  if (propCart) {
    propCart.forEach((value, key) => {
      let itemIcon;
      switch (value.category) {
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

      totalCost += value.price * value.quantity;

      cartListToRender.push(
        <ListItem key={key}>
          <ListItemIcon>{itemIcon}</ListItemIcon>
          <ListItemText
            primary={value.displayName || value.name}
            secondary={value.quantity}
          />
          <Button
            onClick={() => {
              props.incrementItem(value);
              props.decrementFromUpArrow(value);
            }}
          >
            <ArrowUpwardIcon />
          </Button>
          <Button
            onClick={() => {
              props.decrementItem(value);
              props.incrementFromDownArrow(value);
            }}
          >
            <ArrowDownwardIcon />
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              props.removeFromCart(value);
              props.restockAfterDelete(value);
            }}
          >
            <DeleteForeverIcon />
          </Button>
        </ListItem>
      );
    });
  }

  return (
    <Drawer
      id="cart-collapse"
      className={props.classes.drawer}
      variant="persistent"
      anchor="right"
      open={props.openRight}
      classes={{
        paper: props.classes.drawerPaper,
      }}
    >
      <div className={props.classes.drawerHeader}>
        <IconButton onClick={() => props.setOpenRight(false)}>
          {props.theme.direction === 'rtl' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
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
        <List>{cartListToRender}</List>
      ) : (
        <Grid
          container
          spacing={3}
          direction="column"
          justify="space-around"
          alignItems="center"
          style={{ marginTop: '.5em' }}
        >
          <Grid item>
            <Typography variant="h5">Your cart appears to be empty!</Typography>
          </Grid>
          <Grid item>
            <SentimentVeryDissatisfiedIcon />
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

const mapDispatchToProps = {
  removeFromCart,
  incrementItem,
  decrementItem,
  decrementFromUpArrow,
  incrementFromDownArrow,
  restockAfterDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleCart);
