import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import { updateObject, checkValidation } from "../../shared/utility";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "Email",
          placeholder: "Your email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "Password",
          placeholder: "Your password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: true,
    errorMessage: null,
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidation(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      }),
    });

    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchAuthModeHandler = () => {
    console.log(this.state.isSignup);
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
    this.setState({ errorMessage: " hello" });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementsArray.map((formElement) => (
      <Input
        label={formElement.config.elementConfig.type}
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        touched={formElement.config.touched}
        shouldValidate={formElement.config.validation.required}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    // let errorMessage = ' ';

    if (this.props.error) {
      this.state.errorMessage = (
        <p> {this.props.error.message} </p> //error comes from firebase
      );
    } else {
      this.state.errorMessage = null;
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
      window.alert("Logged in!");
    }

    let signupPrompt = (
      <p>
        Don't have an account yet?<Button btnType="Login">Register</Button>
      </p>
    );
    if (this.state.isSignup) {
      signupPrompt = (
        <p>
          Already have an account?<Button btnType="Login">Login</Button>
        </p>
      );
    }

    return (
      <div className={classes.Auth}>
        <h2> WELCOME! :) </h2>
        {authRedirect}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Signup">
            {" "}
            {this.state.isSignup ? "SIGNUP" : "LOGIN"}{" "}
          </Button>
          <hr />
        </form>
        <div
          className={classes.SignupPrompt}
          onClick={this.switchAuthModeHandler}
        >
          {signupPrompt}
        </div>
        <p className={classes.errorMessage}>{this.state.errorMessage} </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
