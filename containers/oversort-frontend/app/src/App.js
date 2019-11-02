import React, { Component } from 'react';
import $ from 'jquery';
import Footer from './components/Footer.js'
import Header from './components/Header.js'
import SortWidget from './components/SortWidget.js'

class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      sorted: [],
      sortId: undefined,
      loading: false
    };
  }

  componentDidMount() {
    if(this.props.sortId) {
      this.setState({
        loading: true
      });
      $.get('./api/history?sortId=' + this.props.sortId, (response) => {
        this.setState({
          sorted: response.output,
          sortId: response.sortId,
          loading: false
        });
      })
    }
  }

  onSubmit(data) {
    data = data.split("\n");
    data = JSON.stringify(data);
    $.get('./api/sorted?array=' + data, (response) => {
      this.setState({
        sorted: response.output,
        sortId: response.sortId
      });
    })
  }

  render() {
    let content = "Loading...";
    if(!this.props.loading) {
      content = <SortWidget
        sorted={this.state.sorted}
        sortId={this.state.sortId}
        onSort={(value) => this.onSubmit(value)}
      />;
    }

    return <div>
        <Header />
        {content}
        <Footer />
       </div>
   }

}
export default App;
