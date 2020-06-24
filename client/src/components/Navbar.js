import React from 'react';
import { Link } from 'react-router-dom';
import { Toolbar, AppBar, MenuList, MenuItem } from '@material-ui/core';

function Navbar() {
  const handleHomeClick = e => {
    e.preventDefault();

    window.open = 'PageText/index.html';
  };

  return (
    <div>
      <AppBar>
        <Toolbar>
          <ul>
            <li>
             <a href="../../../pubic/index.html">TestPage</a>
            </li>
          </ul>
          <h1>IN NAVBAR</h1>
          {/* <MenuList > */}
          <MenuItem onClick={(e) => handleHomeClick(e)}>Home</MenuItem>
          <MenuItem component={Link}>Not Home</MenuItem>
          {/* </MenuList> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
