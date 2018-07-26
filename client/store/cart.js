import axios from 'axios'

const FETCH_CART = 'FETCH_CART';
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';

//Initial State
const initialState = {};

//Action Creator
const fetchCart = (cart) => ({
    type: FETCH_CART,
    cart
});

export const addItemToCart = (cartItemId) => ({
    type: ADD_ITEM_TO_CART,
    cartItemId,
});

export const removeItemFromCart = (cartItemId) => ({
    type: REMOVE_ITEM_FROM_CART,
    cartItemId,
});

//Thunk
export const getCartItems = (userId) => async dispatch => {
    const { data } = await axios.get(`/api/user/${userId}`);
    const userCart = data.cart;
    dispatch(fetchCart(userCart));
}

//Reducer
export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CART:
            return action.cart;
        case ADD_ITEM_TO_CART:
            return {...state}
        case REMOVE_ITEM_FROM_CART:
            return {...state}
        default:
            return state;
    }
};
