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

// Using with React's `useReducer`
function MyComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleIncrement = () => {
    dispatch(actions.increment());
  };

  const handleAssign = () => {
    dispatch(action.assign(10));
  };

  // render (...);
}

// Or simply use it in order to easily run operations on an object in a type-safe and readable way
const { count } = reducer({ count: 0 }, actions.increment());
```
