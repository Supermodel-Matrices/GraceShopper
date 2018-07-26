import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {productReducer} from './products';
import {cartReducer} from './cart';
import {userReducer} from './user';
import createLogger from 'redux-logger';

const reducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  user: userReducer
});

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger({collapsed: true})
  )
);

export default store;
