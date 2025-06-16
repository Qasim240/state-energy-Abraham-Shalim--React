import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, reset } from '../features/slices/counterSlice'
increment
const Test = () => {
    const value = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Counter: {value}</h1>
            <button onClick={() => dispatch(increment())}>Increment</button>{' '}
            <button onClick={() => dispatch(decrement())}>Decrement</button>{' '}
            <button onClick={() => dispatch(reset())}>Reset</button>
        </div>
    )
}

export default Test