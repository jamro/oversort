import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import PermaLink from './PermaLink.js';

class SortWidget extends Component{

  constructor(props) {
    super(props);
    this.state = {
      sortInput: ""
    };
  }

  onSubmit() {
    this.props.onSort(this.state.sortInput);
  }

  handleInputChange(event)  {
    this.setState({sortInput: event.target.value});
  }

  componentDidUpdate(prevProps) {
    if(prevProps.sorted != this.props.sorted) {
      this.setState({
        sortInput:this.props.sorted.join("\n")
      })
    }
  }

  render() {
    let sorted = this.props.sorted.map(el => <ListItem><ListItemText primary={el}/></ListItem>)
    let permaLink = null;
    if(this.props.sortId) {
      permaLink = <div>
          <Divider variant="middle" />
          <PermaLink sortId={this.props.sortId} />
        </div>
    }

    return <div>
        <div>
          <TextField
            label="What would you like to sort?"
            multiline
            margin="normal"
            variant="outlined"
            defaultValue=""
            value={this.state.sortInput}
            onChange={(event) => this.handleInputChange(event)}
            style={{width: '100%'}}
          />
        </div>
        <div style={{marginBottom: '1em'}}>
          <Button variant="contained" color="primary" onClick={() => this.onSubmit()}>
            Sort Me
          </Button>
        </div>
        {permaLink}
      </div>
   }

}
export default SortWidget;
