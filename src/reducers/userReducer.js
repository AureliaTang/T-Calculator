// userReducer.js
import { UPDATE_USER } from '../actions/userActions';

export const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      console.log(state, action);
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;  // Export the userReducer as the default export
