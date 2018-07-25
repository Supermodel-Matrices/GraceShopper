import axios from 'axios';

const FETCH_USER = 'FETCH_USER';

const initialState = {};

const getUser = (user) => ({
  type: FETCH_USER,
      user
});

export const fetchUser = () => {
  return async () => {
    const user = await axios.get('/api/user/:id');
    dispatch(getUser(user.data));
  }
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {...state, user: action.user}
    default:
      return state;
  }
};
