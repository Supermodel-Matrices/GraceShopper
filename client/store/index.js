import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
<<<<<<< HEAD
import {userReducer} from './user';
=======
import { productReducer } from './products';
import { combineReducers } from 'redux';
>>>>>>> 5952ee671fe9b2818e2193ddfb1467340e4fe204

const reducer = combineReducers({
  products: productReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);

export default store;
