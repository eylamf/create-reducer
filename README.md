## tiny-reducer

A tiny utility that helps you create type-safe reducers with readable actions

### Installation

```sh
npm install tiny-reducer
# or
yarn add tiny-reducer
```

### API

```ts
import { createReducer } from "tiny-reducer";

type State = { count: number };

const initialState: State = {
  count: 0,
};

const { reducer, actions } = createReducer(initialState, {
  increment(state) {
    state.count += 1;
  },
  assign(state, value: number) {
    state.count = value;
  },
});
```

### Example with React's `useReducer`

```tsx
import { useReducer } from "react";

function MyComponent() {
  // Using the reducer and actions from the snippet above 👆
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleIncrement = () => {
    dispatch(actions.increment());
  };

  const handleAssign = () => {
    dispatch(actions.assign(10));
  };

  // render (...);
}
```

### Outside of React

This can be used with any JS logic since it is just a type-safe reducer

```ts
function someFunc(toValue: number) {
  const initial = getInitialState(...);
  const afterAssignment = reducer(initial, actions.assign(toValue));
  return reducer(afterAssignment, actions.increment());
}
```
