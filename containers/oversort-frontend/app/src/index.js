import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

let sortId = window.location.href.replace(/^.*#(.*)$/, "$1");
if(sortId == window.location.href) {
  sortId = undefined;
}

ReactDOM.render(<App sortId={sortId} />, document.getElementById('root'));
