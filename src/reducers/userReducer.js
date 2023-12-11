// userReducer.js
import { UPDATE_USER, UPDATE_INVESTMENT } from '../actions/userActions';

export const initialState = {
  userData: [], // or initial user data
  userInvestment: {} // or initial user investment data
};


const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      console.log(state, action);
      return {
        ...state,
        userData: action.payload,
      };
      case UPDATE_INVESTMENT:
        return {
          ...state,
          userInvestment: action.payload,
        };
    default:
      return state;
  }
};

export default userReducer;  // Export the userReducer as the default export
