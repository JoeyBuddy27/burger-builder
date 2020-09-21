import React from 'react';
import classes from './CheckoutSummary.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {
	return (
		<div className={classes.CheckoutSummary}>
			<h3> Your tasty burger! </h3>
			<Burger ingredients={props.ingredients} />
			<Button 
			btnType="Cancel"
			clicked={props.checkoutCancelled}>
			CANCEL </Button>
			<Button 
			btnType="Signup"
			clicked={props.checkoutContinued}>
			CONTINUE </Button>
		</div>
		);
}


export default checkoutSummary;

