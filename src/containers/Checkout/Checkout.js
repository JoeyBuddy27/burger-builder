import React, {Component} from 'react';
import { connect } from 'react-redux';
import classes from './Checkout.css';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {


	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	}

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	}

	render() {
		
		if (this.props.ings) {
		const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null; 
		return (
				<div className={classes.Checkout}>
				{purchasedRedirect}
				<CheckoutSummary 
				ingredients={this.props.ings}
				 checkoutCancelled={this.checkoutCancelledHandler}
				 checkoutContinued={this.checkoutContinuedHandler} />
				 <Route path={this.props.match.url + '/contact-data'}
				 component={ContactData} />
				 </div>
			 );
	}
}
}


const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		purchased: state.order.purchased
		
	}
};


export default connect(mapStateToProps)(Checkout);

