import React from 'react';
import { connect } from 'react-redux';
import '../styles/header.scss';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
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
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" id="main-header">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Dat Online Store
          </Typography>
          <Button color="inherit">{`Cart (${props.cart.length})`}</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(Header);
