import React from 'react'

class Home extends React.Component {

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

export default Home;