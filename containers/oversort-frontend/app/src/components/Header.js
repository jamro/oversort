import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortAmountUp } from '@fortawesome/free-solid-svg-icons'

class Header extends Component{

   render() {
      return <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6">
            <FontAwesomeIcon icon={faSortAmountUp} /> OverSort
          </Typography>
        </Toolbar>
      </AppBar>
   }

}
export default Header;
