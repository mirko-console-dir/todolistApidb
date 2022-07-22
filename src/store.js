import { createStore } from "redux";
const initTodos = [
  {
    name: "Call my mum",
    dueDate: new Date().toLocaleDateString(),
    user_id: 1,
  },
  {
    name: "Go to school",
    dueDate: new Date().toLocaleDateString(),
    user_id: 1,
  },
  {
    name: "Do my homework",
    dueDate: new Date().toLocaleDateString(),
    user_id: 1,
  },
];
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [action.payload, ...state];
    case "REMOVE_TODO":
      return state.filter((t) => t.name !== action.payload.name);

    default:
      return state;
  }
};

export const store = createStore(
  reducer,
  initTodos,
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
);
