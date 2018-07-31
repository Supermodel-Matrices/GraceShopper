import axios from 'axios';

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
	const response = await axios.put('/auth/login', formData);
	dispatch(loginUser(response.data));
};

export const signup = (formData) => async dispatch => {
	const response = await axios.post('/auth/signup', formData);
	dispatch(loginUser(response.data));
};

export const getLoggedInUser = () => async dispatch => {
	const response = await axios.get('/auth/me');
	const loggedInUser = response.data;
	dispatch(loginUser(loggedInUser));
	return loggedInUser;
};

export const logoutUser = () => async dispatch => {
	await axios.delete('/auth/logout');
	dispatch(logout());
};

export const updateUser = (update) => async dispatch => {
	const response = await axios.put(`/api/user/${update.id}`, update);
	const updated = response.data;
	dispatch(updatedUser(updated));
	return updated;
};
