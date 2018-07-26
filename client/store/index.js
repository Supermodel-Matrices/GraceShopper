import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { productReducer } from './products';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  products: productReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware
  )
);

export default store;