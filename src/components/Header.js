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

const drawerWidth = 300;

const useCollapseNavStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
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
      className={clsx(classes.list, {
        [classes.fullList]: 'top',
      })}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button key={'cart'}>
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
    cartListToRender.push(
      <ListItem key={key}>
        <ListItemIcon>
          <CakeIcon />
        </ListItemIcon>
        <ListItemText
          primary={value.displayName || value.name}
          secondary={value.quantity}
        />
        <Button>
          <DeleteForeverIcon
            onClick={() =>
              props.dispatch({
                type: 'DELETE_FROM_CART',
                payload: value,
              })
            }
          />
        </Button>
      </ListItem>
    );
  });

  return (
    <div className={classes.root}>
      <AppBar position="fixed" id="main-header">
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
            onClick={() => setOpenRight(true)}
          >{`Cart (${props.cartCount})`}</Button>
        </Toolbar>
      </AppBar>
      <Drawer
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
          <Typography variant="h6">Cart Items: {props.cartCount}</Typography>
        </div>
        <Divider />
        <List>{cartListToRender}</List>
      </Drawer>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    cartCount: state.cartCount,
  };
};

export default connect(mapStateToProps)(Header);
