import React from 'react'

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
			hello: true
        };
    }

	render()	{

        return (
			<div style={{position: 'absolute', height: '100%', width: '100%', background: 'red'}}>

            </div>
        )
    }
}

