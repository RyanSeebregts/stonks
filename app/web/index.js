/*import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
	<div style={{height: '50px', width: '50px', background: 'red'}}></div>
	, document.getElementById('root'));
*/
'use strict';

const e = React.createElement;
import Home from './screens/home.js'
class RootComp extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
	};
  }

  render() {
    return (
      <Home />
    );
  }
}

const domContainer = document.querySelector('#root');
ReactDOM.render((RootComp), domContainer);