import React, { Component } from 'react';
import $ from 'jquery';

class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      sortInput: ''
    };
  }

  onSubmit(event) {
    let data = this.state.sortInput;
    data = data.split("\n");
    data = JSON.stringify(data);
    $.get('./api/sorted?array=' + data, (response) => {
      response = response.join("\n");
      this.setState({sortInput: response});
    })
  }

  handleInputChange(event)  {
    this.setState({sortInput: event.target.value});
  }

   render() {
      return <div>
         <div>
           <textarea rows="10" cols="50" value={this.state.sortInput} onChange={(event) => this.handleInputChange(event)} />
           <hr />
           <button onClick={() => this.onSubmit()}>Sort Data</button>
         </div>
         <hr />
         <small><a href="/admin/" target="_blank">Admin Panel</a></small>
       </div>
   }

}
export default App;
