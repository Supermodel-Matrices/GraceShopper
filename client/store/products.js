import axios from 'axios';

const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
const FETCH_PRODUCT = 'FETCH_PRODUCT';

const initialState = {
	allProducts: [],
	currentProduct: {}
};

export const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_PRODUCTS:
			return {...state, allProducts: action.products};
		case FETCH_PRODUCT:
			return {...state, currentProduct: action.product};
		default:
		  return state;
	}
}

const getProducts = (products) => ({
	type: FETCH_PRODUCTS,
	products
});

const getProduct = (product) => ({
	type: FETCH_PRODUCT,
	product
});

export const fetchProducts = () => async dispatch => {
	const response = await axios.get('/api/products');
	dispatch(getProducts(response.data));
};

export const fetchProduct = (id) => async dispatch => {
	const response = await axios.get(`/api/products/${id}`);
	dispatch(getProduct(response.data));
};
