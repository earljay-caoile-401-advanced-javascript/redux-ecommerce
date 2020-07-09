import React from 'react';
import '../styles/header.scss';
// import { Link } from 'react-router-dom';

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
    <div id="main-header">
      <h1>Dat Header</h1>
    </div>
  );
}

export default Header;
