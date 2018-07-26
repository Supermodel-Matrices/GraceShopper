const FETCH_CART_ITEMS = 'FETCH_CART_ITEMS';
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';

//Initial State
const initialState = {
    cart: [],
};

//Action Creator
export const getCartItems = () => ({
    type: FETCH_CART_ITEMS
});

//For Use In Product Component To Add To Cart - Cheryl
export const addItemToCart = (cartItem) => ({
    type: ADD_ITEM_TO_CART,
    cartItem,
});

export const removeItemFromCart = (cartItemId) => ({
    type: REMOVE_ITEM_FROM_CART,
    cartItemId,
});

//Reducer
export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CART_ITEMS:
            return state;
        case ADD_ITEM_TO_CART:
            return {...state, cart: [...state.cart, action.cartItem]}
        case REMOVE_ITEM_FROM_CART:
            return {...state, cart: [...state.cart.filter(item => item.id !== action.cartItemId)]}
        default:
            return state;
    }
};
