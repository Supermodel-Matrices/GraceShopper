import axios from 'axios';

const LOGIN_USER = 'LOGIN_USER';

const initialState = {};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
		case LOGIN_USER:
			return action.user;
		default:
		  return state;
	}
};

const loginUser = (user) => ({
	type: LOGIN_USER,
	user
});

export const login = (formData) => async dispatch => {
	const response = await axios.put('/auth/login', formData);
	dispatch(loginUser(response.data));
};

export const signup = (formData) => async dispatch => {
	const response = await axios.post('/auth/signup', formData);
	dispatch(loginUser(response.data));
}

export const getLoggedInUser = () => async dispatch => {
	const response = await axios.get('auth/me');
	const loggedInUser = response.data;
	dispatch(loginUser(loggedInUser));
}
