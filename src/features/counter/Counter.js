import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userReducer } from './counterSlice'
// import styles from './Counter.module.css'

export function Counter() {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(userReducer())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(userReducer())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}