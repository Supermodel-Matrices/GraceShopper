import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { productReducer } from './products';
import { cartReducer } from './cart';

const reducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware
  )
);

export default store;
 