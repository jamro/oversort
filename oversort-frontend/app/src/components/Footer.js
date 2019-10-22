import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';

class Footer extends Component{

   render() {
      return <div>
        <Divider variant="middle" />
        <div style={{textAlign: 'center'}}>
          <a href="/admin/" target="_blank">
            <Link component="button" variant="body">
              Admin Panel
            </Link>
          </a>
        </div>
       </div>;
   }

}
export default Footer;
