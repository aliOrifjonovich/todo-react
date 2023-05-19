import React, { useContext } from "react";
import EmptyImage from "../EmptyImage/EmptyImage";
import cls from "../SubmitPart/submit.module.scss";
import { Context } from "../SubmitPart/Submit";
import TodoList from "../TodoList/TodoList";
import { useSelector } from "react-redux";

const TodoUlList = () => {
  const todosFromRedux = useSelector((state)=>state.todos)
  const {
    todos,
    status,
    selectFilter,
    firstPostIndex,
    lastPostIndex,
    setTodos,
  } = useContext(Context);
  return (
    <ul className={cls.todos_list}>
      {todos.length === 0 ? (
        <EmptyImage />
      ) : (
        selectFilter(todosFromRedux, status)
          .slice(firstPostIndex, lastPostIndex)
          .map((item, i) => (
            <TodoList
              key={item.id}
              item={item}
              index={i}
              id={item.id}
              setTodos={setTodos}
              todos={todos}
              firstPostIndex={firstPostIndex}
            />
          ))
      )}
    </ul>
  );
};

export default TodoUlList;
