import axios from 'axios';

const FETCH_CART = 'FETCH_CART';
// const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
// const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';

//Initial State
const initialState = {};

//Action Creator
const fetchCart = (cart) => ({
	type: FETCH_CART,
	cart
});

//Thunk
export const getCart = () => async dispatch => {
	const response = await axios.get(`/api/cart`);
	dispatch(fetchCart(response.data));
	return response.data;
}

export const addToCart = (id) => async dispatch => {
	const response = await axios.put(`/api/cart`, { action: 'add', id: id });
	dispatch(fetchCart(response.data));
}

export const removeFromCart = (id) => async dispatch => {
	const response = await axios.put(`/api/cart`, { action: 'remove', id: id });
	dispatch(fetchCart(response.data));
}

//Reducer
export const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_CART:
			return action.cart;
		default:
			return state;
	}
};
