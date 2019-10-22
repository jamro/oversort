import React, { Component } from 'react';

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
    let sorted = this.props.sorted.map(el => <li>{el}</li>)
    return <div>
        <div>
          <textarea rows="10" cols="50" value={this.state.sortInput} onChange={(event) => this.handleInputChange(event)} />
          <hr />
          <button onClick={() => this.onSubmit()}>Sort Data</button>
        </div>
        <hr />
        <div>
          <strong>Sorted</strong>
          <ul>
            {sorted.length ? sorted :  <li>no results</li>}
          </ul>
        </div>
      </div>
   }

}
export default SortWidget;
