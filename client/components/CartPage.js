import React, { Component } from 'react';
import { connect } from 'react-redux';

class CartPage extends Component {
    constructor(){
        super()
        this.state = {
            cart: {},
        }
    }

    render(){
        return (
            <React.Fragment>
                
            </React.Fragment>
        )
    }
}

const mapToState = state => {

}

const mapToDispatch = dispatch => {

}

export default connect(mapToState, mapToDispatch)(CartPage);

