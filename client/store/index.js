import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {userReducer} from './user';
import {productReducer} from './products';
import {combineReducers} from 'redux';

const reducer = combineReducers({
  products: productReducer,
  user: userReducer
});

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);

export default store;
