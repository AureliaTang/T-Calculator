// userActions.js
export const UPDATE_USER = 'UPDATE_USER';
// export const UPDATE_GRAPH = 'UPDATE_GRAPH';


// Action creator
export const updateUser = (userData) => {
  return {
    type: UPDATE_USER,
    payload: userData,
  };
};

// // Action creator
// export const updateGraph = (userData) => {
//   return {
//     type: UPDATE_GRAPH,
//     payload: userData,
//   };
// };
