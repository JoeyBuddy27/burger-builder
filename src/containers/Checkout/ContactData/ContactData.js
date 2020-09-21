import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders.js";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import { updateObject, checkValidation } from "../../../shared/utility";
import Modal from "../../../components/UI/Modal/Modal";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "Name",
          placeholder: "your name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "Street",
          placeholder: "your street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },

      postCode: {
        elementType: "input",
        elementConfig: {
          type: "PostCode",
          placeholder: "your postcode",
        },
        value: "",
        validation: {
          required: true,
          minLength: 4,
          maxLength: 8,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "Country",
          placeholder: "your country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },

      email: {
        elementType: "input",
        elementConfig: {
          type: "Email",
          placeholder: "your email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },

      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          type: "Delivery",
          options: [
            { value: "fastest", displayValue: "fastest" },
            { value: "cheaptest", displayValue: "cheapest" },
          ],
        },
        value: "fastest",
        validation: {
          required: false,
        },
        valid: true,
      },
    },
    formIsValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault(); //dont send request

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    const order = {
      price: "£" + this.props.price,
      ingredients: this.props.ings,
      orderData: formData,
      userId: this.props.userId,
      orderNum: this.props.orderNum,
      orderDate: formData.date.value,
    };
    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangedHandlder = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(
      this.state.orderForm[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidation(
          event.target.value,
          this.state.orderForm[inputIdentifier].validation
        ),
        touched: true,
      }
    );
    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormElement,
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let postCodeError = null;
    if (
      !this.state.orderForm.postCode.valid &&
      this.state.orderForm.postCode.touched
    ) {
      postCodeError = <p style={{ color: "red" }}>postcode error!</p>;
    } else {
      postCodeError = null;
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            label={formElement.config.elementConfig.type}
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            shouldValidate={formElement.config.validation.required}
            changed={(event) =>
              this.inputChangedHandlder(event, formElement.id)
            }
          />
        ))}
        <br />
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          {" "}
          ORDER{" "}
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
        {postCodeError}
        <Modal open={this.state.orderModal} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
