import { Draft, produce } from "immer";

type Reducer<State, Action> = (state: State, action: Action) => State;

type ReducerAction<Type extends string, Payload> = {
  type: Type;
  payload: Payload;
};

type UserActions<State> = {
  [key: string]: (state: Draft<State>, payload: any) => void | State;
};

type ActionCreators<State, Actions extends UserActions<State>> = {
  [Key in keyof Actions]: Parameters<Actions[Key]>[1] extends undefined
    ? () => ReducerAction<Key & string, Parameters<Actions[Key]>[1]>
    : (
        payload: Parameters<Actions[Key]>[1]
      ) => ReducerAction<Key & string, Parameters<Actions[Key]>[1]>;
};

export function createReducer<State, Actions extends UserActions<State>>(
  _initialState: State,
  userActions: Actions
) {
  const reducer: Reducer<State, ReducerAction<keyof Actions & string, any>> = (
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
    acc[type as keyof Actions] = ((payload: any) => ({ type, payload })) as any;
    return acc;
  }, {} as ActionCreators<State, Actions>);

  return { reducer, actions };
}
