const Add = "ADD";
const CLEAR = "CLEAR";
const DELETE = "DELETE";
const SAVE = "SAVE";
const CHECKBOX = "CHECKBOX";
const SET_TODOS = "SET_TODOS";

const intialState = [];

export const todoReducer = (state = intialState, action) => {
  switch (action.type) {
    case Add:
      console.log(action.type);
      return [action.newTodo, ...state];
    case CLEAR:
      return [];
    case DELETE:
      return state.filter((todo) => todo.id !== action.id);
    case SAVE:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, value:action.value } : todo
      );
    case CHECKBOX:
      return state.map((todo) =>
        todo.id === action.id? {...todo, isDone:!todo.isDone } : todo
      );
    case SET_TODOS:
      return [...action.todos];
    default:
      return state;
  }
};
export const AddAction = (newTodo) => {
  return {
    type: Add,
    newTodo,
  };
};

export const ClearAction = () => {
  return {
    type: CLEAR,
  };
};
export const DeleteAction = (id) => {
  return {
    type: DELETE,
    id,
  };
};

export const SaveAction = (id, value) => {
  return {
    type: SAVE,
    id,
    value,
  };
};
export const CheckBoxAction = (id) => {
  return {
      type: CHECKBOX,
      id,
    };
}
export const SetTodosAction = (todos) => {
  return {
      type: SET_TODOS,
      todos,
    };
}