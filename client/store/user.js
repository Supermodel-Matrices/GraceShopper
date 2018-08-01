import axios from 'axios';
import {emptyCart, fetchCart} from './cart';

const LOGIN_USER = 'LOGIN_USER';
const LOG_OUT = 'LOG_OUT';
const UPDATE_USER = 'UPDATE_USER';

const initialState = {};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
		case LOGIN_USER:
			return action.user;
		case LOG_OUT:
			return {};
		case UPDATE_USER:
		return action.user;
		default:
		  return state;
	}
};

const loginUser = (user) => ({
	type: LOGIN_USER,
	user
});

const logout = () => ({
	type: LOG_OUT
});

const updatedUser = (user) => ({
	type: UPDATE_USER,
	user
});

export const login = (formData) => async dispatch => {
	try {
		const response = await axios.put('/auth/login', formData);
		dispatch(loginUser(response.data));
		dispatch(fetchCart(response.data.cart));
	}
	catch (err) {
		if (err.response) {
			return err.response.status;
		}
	}
};

export const signup = (formData) => async dispatch => {
	let response;
	try {
		response = await axios.post('/auth/signup', formData);
		dispatch(loginUser(response.data));
	}
	catch (err) {
		return err.response.status;
	}
}

export const getLoggedInUser = () => async dispatch => {
	const response = await axios.get('/auth/me');
	const loggedInUser = response.data;
	dispatch(loginUser(loggedInUser));
	return loggedInUser;
};

export const logoutUser = () => async dispatch => {
	await axios.delete('/auth/logout');
	dispatch(logout());
	dispatch(emptyCart());
};

export const updateUser = (update) => async dispatch => {
	const response = await axios.put(`/api/user/${update.id}`, update);
	const updated = response.data;
	dispatch(updatedUser(updated));
	return updated;
};

