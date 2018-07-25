import axios from 'axios';

const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

const initialState = [];

export const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_PRODUCTS:
			return action.products;
		default:
		  return state;
	}
}

const getProducts = (products) => ({
	type: FETCH_PRODUCTS,
	products
});

export const fetchProducts = () => async dispatch => {
	const response = await axios.get('/api/products');
	dispatch(getProducts(response.data));
};
