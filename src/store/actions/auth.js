import * as actionTypes from './actionTypes';


export const authStart = () => {		//no saga needed
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = (token, userId) => {    //no saga needed
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId: userId
	};
};

export const authFail = (error) => {	//no saga needed
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	};
};

export const checkAuthTimeout = (expirationTime) => {	//checkAuthTimeoutSaga handles side effects
	return {
		type: actionTypes.CHECK_AUTH_TIMEOUT,
		expirationTime: expirationTime 
	};
};

export const logout = () => {		//logoutSaga handles side effects
	return {
		type: actionTypes.AUTH_INITIATE_LOGOUT
	};
};

export const logoutSuccess = () => { //no saga needed
	return {
		type: actionTypes.AUTH_LOGOUT
	};
};

export const auth = (email, password, isSignup) => { //uses authSaga
	return {
		type: actionTypes.AUTH_USER,
		email: email,
		password: password,
		isSignup: isSignup
	};
};

export const setAuthRedirectPath = (path) => {	//no saga needed
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path
	};
};

export const authCheckState = () => {
	return {
		type: actionTypes.AUTH_CHECK_STATE
	};
};