import { ADDTODOS, REMOVETODOS, SETTODOS, REMOVETASK } from "./action.type";

export const reducer = (state, action) => {
  //   state.todos = [];

  switch (action.type) {
    case SETTODOS:
      return (state = action.payload);
    case ADDTODOS:
      return [...state.todos, action.payload];
    case REMOVETASK:
      console.log("hello");
      for (let i = 0; i < state.length; i++) {
        console.log(state[i].tasks.length);
        for (let k = 0; k < state[i].tasks.length; k++) {
          if (state[i].tasks[k]._id === action._id) {
            state[i].tasks.splice(k, 1);
          }
        }
      }
      return state;
    case REMOVETODOS:
      return state.filter((e) => e._id !== action._id);

    default:
      return state;
  }
};
