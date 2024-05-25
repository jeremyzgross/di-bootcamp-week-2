import React, { useReducer } from "react";

interface State {
  count: number;
}

type Action = { type: "increment" } | { type: "decrement" } | { type: "reset" };

const initialState: State = {
  count: 0
};

const CounterReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "reset":
      return initialState;
    default:
      return state;
  }
};

const CounterTwo: React.FC = () => {
  const [state, dispatch] = useReducer(CounterReducer, initialState);

  return (
    <>
      <h1>Counter w/reducer</h1>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </>
  );
};

export default CounterTwo;
