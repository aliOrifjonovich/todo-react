import React from "react";
import cls from "./Modal.module.scss";

const Modal = ({ setTodos, todos, item, setDeletedId }) => {
  const deleteItem = () => {
    todos = todos.filter((todo) => todo.id !== item.id);
    setTodos(todos);
    setDeletedId("")
  };
  const cancelItem = () => {
    setDeletedId("")
  }
  return (
    <div className={cls.modal}>
      <div className={cls.wrapper}>
        <h1>Are sure to delete this <br/>"{item.value}" <br/> list</h1>
        <div className={cls.buttons}>
          <button onClick={deleteItem} className={cls.yes}>yes</button>
          <button onClick={cancelItem}className={cls.no}>no</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
