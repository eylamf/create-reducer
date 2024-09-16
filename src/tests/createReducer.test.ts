import { createReducer } from "../createReducer";

describe("createReducer", () => {
  it("creates a reducer and handle the generated actions", () => {
    const { reducer, actions } = createReducer(
      { count: 0 },
      {
        increment(state) {
          state.count += 1;
        },
        decrement(state) {
          state.count -= 1;
        },
        updateTo(state, value: number) {
          state.count = value;
        },
      }
    );

    let state = reducer({ count: 0 }, actions.increment());
    expect(state).toEqual({ count: 1 });

    state = reducer(state, actions.decrement());
    expect(state).toEqual({ count: 0 });

    state = reducer(state, actions.updateTo(10));
    expect(state).toEqual({ count: 10 });
  });

  it("creates a more complex reducer and handle the generated actions", () => {
    const initialState = { age: 30, petNames: ["Kassie"] };
    const { reducer, actions } = createReducer(initialState, {
      birthday(state) {
        state.age += 1;
      },
      birthdayAndGetNewPet(state, petName: string) {
        state.age += 1;
        state.petNames.push(petName);
      },
    });

    let state = reducer(initialState, actions.birthday());
    expect(state).toEqual({ ...initialState, age: 31 });

    state = reducer(state, actions.birthdayAndGetNewPet("Emmie"));
    expect(state).toEqual({ age: 32, petNames: ["Kassie", "Emmie"] });
  });
});
