import React, { Component } from 'react';
import $ from 'jquery';
import Footer from './components/Footer.js'
import Header from './components/Header.js'
import SortWidget from './components/SortWidget.js'

class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      sorted: []
    };
  }

  onSubmit(data) {
    data = data.split("\n");
    data = JSON.stringify(data);
    $.get('./api/sorted?array=' + data, (response) => {
      this.setState({sorted: response});
    })
  }

  handleInputChange(event)  {
    this.setState({sortInput: event.target.value});
  }

   render() {
      return <div>
        <Header />
        <SortWidget
          sorted={this.state.sorted}
          onSort={(value) => this.onSubmit(value)}
        />
        <Footer />
       </div>
   }

}
export default App;
