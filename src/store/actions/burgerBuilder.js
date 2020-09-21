import * as actionTypes from './actionTypes';


export const addIngredient = (name) => {
	return {
		ingredientName: name,
		type: actionTypes.ADD_INGREDIENT
	};
};

export const removeIngredient = (name) => {
	return {
		ingredientName: name,
		type: actionTypes.REMOVE_INGREDIENT
	};
};

export const clearBurger = () => {
	return {
		type: actionTypes.CLEAR_BURGER
	};
};

export const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED
	};
};

export const setIngredients = (ingredients) => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients
	};
};

export const initIngredients = (error) => {
	return {
		error: error,
		type: actionTypes.INIT_INGREDIENTS
	};
};

export const initPrice = () => {
	return {
		type: actionTypes.INIT_PRICE
	};
};

