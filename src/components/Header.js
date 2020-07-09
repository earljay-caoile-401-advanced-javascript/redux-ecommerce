import React from 'react';
import '../styles/header.scss';
// import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
/**
 * Simple header content that shows up on every page. Contains title and nav bar
 *
 * @component
 * @example
 * return (
 *   <Header />
 * )
 */
function Header() {
  // const links = [
  //   { displayName: 'Home', url: '/' },
  //   { displayName: 'Something', url: '/something' },
  // ];

  // const navLinks = [];

  // const [expanded, setExpanded] = useState(false);

  // for (let i = 0; i < links.length; i++) {
  //   navLinks.push(
  //     <Link
  //       className="nav-link"
  //       key={i}
  //       to={links[i].url}
  //       onClick={() => setTimeout(() => setExpanded(false), 100)}
  //     >
  //       {links[i].displayName}
  //     </Link>
  //   );
  // }

  return (
    <AppBar position="static" id="main-header">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">Dat Shopping App</Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
