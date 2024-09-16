import { Reducer } from "react";
import { Draft, produce } from "immer";

type ReducerAction<T extends string, P> = {
  type: T;
  payload: P;
};

type UserActions<State> = {
  [key: string]: (state: Draft<State>, payload: any) => void | State;
};

type ActionCreators<State, A extends UserActions<State>> = {
  [K in keyof A]: Parameters<A[K]>[1] extends undefined
    ? () => ReducerAction<K & string, Parameters<A[K]>[1]>
    : (
        payload: Parameters<A[K]>[1]
      ) => ReducerAction<K & string, Parameters<A[K]>[1]>;
};

export function createReducer<State, Action extends UserActions<State>>(
  _initialState: State,
  userActions: Action
) {
  const reducer: Reducer<State, ReducerAction<keyof Action & string, any>> = (
    state,
    action
  ) => {
    const userAction = userActions[action.type];

    if (userAction) {
      return produce(state, (draft) => {
        userAction(draft, action.payload);
      });
    }

    return state;
  };

  const actions = Object.keys(userActions).reduce((acc, type) => {
    acc[type as keyof Action] = ((payload: any) => ({ type, payload })) as any;
    return acc;
  }, {} as ActionCreators<State, Action>);

  return { reducer, actions };
}
