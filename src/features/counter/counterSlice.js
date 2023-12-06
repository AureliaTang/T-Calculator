import { createSlice } from '@reduxjs/toolkit'
export const INCREMENT = 'INCREMENT';

// Action creator
export const increment = (amount) => {
  return (dispatch) => {
    console.log('^^^^^^^^^^^^')
    console.log(amount)
    dispatch({
      type: INCREMENT,
      payload: amount,
    });
  };
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    providers: {
      // "0": {}
    }
  },
  reducers: {
    setProviders: (state, action) => {
      console.log('***********')
      console.log(action.payload)
      state.value = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setProviders } = counterSlice.actions

export default counterSlice.reducer