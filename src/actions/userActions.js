// userActions.js
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_INVESTMENT = 'UPDATE_INVESTMENT';

// export const UPDATE_GRAPH = 'UPDATE_GRAPH';


// Action creator
export const updateUser = (userData) => {
  return {
    type: UPDATE_USER,
    payload: userData,
  };
};

// Action creator
export const updateInvestment = (userInvestment) => {
  return {
    type: UPDATE_INVESTMENT,
    payload: userInvestment,
  };
};

// // Action creator
// export const updateGraph = (userData) => {
//   return {
//     type: UPDATE_GRAPH,
//     payload: userData,
//   };
// };
