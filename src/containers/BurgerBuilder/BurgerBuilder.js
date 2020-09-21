import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Auxillary/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler.js";
import * as burgerActions from "../../store/actions/index";
import axios from "../../axios-orders.js";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount = () => {
    this.props.onInitIngredients();
    this.props.onInitPrice();
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    if (this.props.totalPrice > 8) {
      return {
        ...this.state,
        purchasing: false,
      };
    } else {
      return sum > 0;
    }
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  trackIngredientNum = (type) => {
    console.log(this.props.ings[type]);
    if (this.props.ings > 3) {
      this.props.ings = 3;
    }
    return this.props.ings[type];
  };

  totalTypeHandler = (type) => {
    if (this.props.ings[type] > 0) {
      return "Positive";
    } else {
      return "Negative";
    }
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    const disabledMore = {
      ...this.props.ings,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    for (let key in disabledMore) {
      disabledMore[key] = disabledMore[key] >= 2;
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients can't be loaded </p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            disabledMore={disabledMore}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.price}
            info={this.props.info}
            clear={this.props.onClearBurger}
            summed={this.trackIngredientNum}
            totalType={this.totalTypeHandler}
            infoStyle={this.props.infoStyle}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          info={this.state.info}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    info: state.burgerBuilder.info,
    purchaseState: state.burgerBuilder.purchasable,
    infoStyle: state.burgerBuilder.infoStyle,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch(burgerActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(burgerActions.removeIngredient(ingName)),
    onClearBurger: () => dispatch(burgerActions.clearBurger()),
    onInitIngredients: () => dispatch(burgerActions.initIngredients()),
    onInitPrice: () => dispatch(burgerActions.initPrice()),
    onInitPurchase: () => dispatch(burgerActions.initPurchase()),
    onSetAuthRedirectPath: (path) =>
      dispatch(burgerActions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
