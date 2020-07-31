/*import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
	<div style={{height: '50px', width: '50px', background: 'red'}}></div>
	, document.getElementById('root'));
*/
'use strict';

const e = React.createElement;

class LikeButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(e(LikeButton), domContainer);