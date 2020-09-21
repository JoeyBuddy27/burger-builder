import React, { Component } from 'react';
import Aux from '../../../hoc/Auxillary/Auxillary';
import Button from '../../UI/Button/Button';
import classes from './OrderSummary.css';

class OrderSummary extends Component {
   
    render () {
        const ingredientSummary = Object.keys( this.props.ingredients )
            .map( igKey => {
                return (
                    <p key={igKey}>
                        <span style={{ textTransform: 'uppercase' }}>{igKey}: </span>
                         {this.props.ingredients[igKey]}
                    </p> );
            } );

        return (
            <Aux>
            <div className={classes.OrderSummary}>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients: </p>
                
                    {ingredientSummary}
                
                <p><strong>Total Price: £{this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </div>
            </Aux>
        );
    }
}

export default OrderSummary;