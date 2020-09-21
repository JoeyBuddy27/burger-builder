import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: {
    ketchup: 0,
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 1,
  },
  totalPrice: 4,
  info: "CUSTOMIZE YOUR BURGER!",
  infoStyle: "Info",
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 1,
  bacon: 1,
  ketchup: 0.5,
  meat: 1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,

        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true,
      };

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true,
      };

    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ketchup: action.ingredients.ketchup,
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        error: false,
        price: initialState.totalPrice,
        building: false,
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };

    case actionTypes.CLEAR_BURGER:
      return {
        ...state,
        ingredients: initialState.ingredients,
        totalPrice: initialState.totalPrice,
        building: false,
      };

    case actionTypes.INIT_PRICE:
      return {
        ...state,
        totalPrice: initialState.totalPrice,
      };
    default:
      return state;
  }
};

export default reducer;
