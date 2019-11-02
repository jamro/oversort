import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

class PermaLink extends Component{

   render() {
     let permaLinkUrl = window.location.href.replace(/#.*/, '') + '#' + this.props.sortId
     return <Typography variant="overline" display="block" gutterBottom align="center">
        Permalink: <a href={permaLinkUrl} target="_blank">{permaLinkUrl}</a>
      </Typography>
   }

}
export default PermaLink;
