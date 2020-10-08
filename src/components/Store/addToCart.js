import React, { Component } from 'react'

import CartData from './DataTables/CartData';

export default class addToCart extends Component {



    render() {
        return (
    <div className="content mt-3 p-3">
		<div className="card">
			<CartData id={this.props.match.params.id} />
		</div>
	</div>
        )
    }
}
