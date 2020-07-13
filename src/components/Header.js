import React, { useState } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import '../styles/header.scss';
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
  Drawer,
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import CakeIcon from '@material-ui/icons/Cake';
import GavelIcon from '@material-ui/icons/Gavel';
import DevicesIcon from '@material-ui/icons/Devices';
import HealingIcon from '@material-ui/icons/Healing';
import HelpIcon from '@material-ui/icons/Help';

const drawerWidth = 300;

const useCollapseNavStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  topList: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
}));

/**
 * Simple header content that shows up on every page. Contains title and nav bar
 *
 * @component
 * @example
 * return (
 *   <Header />
 * )
 */
function Header(props) {
  const classes = useCollapseNavStyles();
  const theme = useTheme();
  const [openTop, setOpenTop] = useState(false);
  const [openRight, setOpenRight] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpenTop(open);
  };

  const collapseNavList = () => (
    <div
      className={clsx(classes.topList, {
        [classes.fullList]: 'top',
      })}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button key={'cart'} onClick={() => setOpenRight(true)}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary={`Cart: (${props.cartCount})`} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key={'logout'}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary={'Logout'} />
        </ListItem>
      </List>
    </div>
  );

  const cartListToRender = [];

  props.cart.forEach((value, key) => {
    let itemIcon;
    switch (value.category) {
      case 'mythical_weapons':
        itemIcon = <GavelIcon />;
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

    cartListToRender.push(
      <ListItem key={key}>
        <ListItemIcon>{itemIcon}</ListItemIcon>
        <ListItemText
          primary={value.displayName || value.name}
          secondary={value.quantity}
        />
        <Button
          onClick={() =>
            props.dispatch({
              type: 'DELETE_FROM_CART',
              payload: value,
            })
          }
        >
          <DeleteForeverIcon />
        </Button>
      </ListItem>
    );
  });

  return (
    <AppBar
      position="fixed"
      id="main-header"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: openRight,
      })}
    >
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          id="nav-icon"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <SwipeableDrawer
          anchor={'top'}
          open={openTop}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {collapseNavList()}
        </SwipeableDrawer>
        <Typography variant="h6" className={classes.title}>
          Dat Online Store
        </Typography>
        <Button
          color="inherit"
          id="nav-cart"
          onClick={() => setOpenRight(!openRight)}
        >{`Cart (${props.cartCount})`}</Button>
      </Toolbar>
      <Drawer
        id="cart-collapse"
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={openRight}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => setOpenRight(false)}>
            {theme.direction === 'rtl' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
          <Typography variant="h6">Cart Items</Typography>
        </div>
        <Divider />
        <List>{cartListToRender}</List>
      </Drawer>
    </AppBar>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    cartCount: state.cartCount,
  };
};

export default connect(mapStateToProps)(Header);
