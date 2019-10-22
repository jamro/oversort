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


class SortWidget extends Component{

  constructor(props) {
    super(props);
    this.state = {
      sortInput: ''
    };
  }

  onSubmit() {
    this.props.onSort(this.state.sortInput);
  }

  handleInputChange(event)  {
    this.setState({sortInput: event.target.value});
  }

  render() {
    let sorted = this.props.sorted.map(el => <ListItem><ListItemText primary={el}/></ListItem>)
    return <div>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <div>
              <TextField
                label="What would you like to sort?"
                multiline
                margin="normal"
                variant="outlined"
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
          </Grid>
          <Grid item xs={6}>
            <Paper style={{margin: '1em 0', padding: '1em'}}>
              <Typography variant="h5" component="h3">
                Result of sorting
              </Typography>
              <List>
                {sorted.length ? sorted :  <ListSubheader>Nothing</ListSubheader>}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </div>
   }

}
export default SortWidget;
