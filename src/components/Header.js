import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { connect } from 'react-redux';
import SimpleCart from './SimpleCart';
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
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 350;

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
        <Link to="/" className="no-style">
          <ListItem button key={'home'}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={`Home`} style={{ color: 'gray' }} />
          </ListItem>
        </Link>
        <Link to="/cart" className="no-style">
          <ListItem button key={'cart'}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText
              primary={`Cart (${props.cartCount})`}
              style={{ color: 'gray' }}
            />
          </ListItem>
        </Link>
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
          <Link to="/" className="no-style">
            Dat Online Store
          </Link>
        </Typography>
        <div id="nav-cart">
          <Link to="/cart" className="no-style">
            <Button
              color="inherit"
              id="nav-cart"
            >{`Cart (${props.cartCount})`}</Button>
          </Link>
          <IconButton onClick={() => setOpenRight(!openRight)}>
            {openRight ? (
              <ChevronRightIcon style={{ color: 'white' }} />
            ) : (
              <ChevronLeftIcon style={{ color: 'white' }} />
            )}
          </IconButton>
        </div>
      </Toolbar>
      <SimpleCart
        theme={theme}
        openRight={openRight}
        setOpenRight={setOpenRight}
        classes={classes}
      />
    </AppBar>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cartStore.cart,
    cartCount: state.cartStore.cartCount,
  };
};

export default connect(mapStateToProps)(Header);
