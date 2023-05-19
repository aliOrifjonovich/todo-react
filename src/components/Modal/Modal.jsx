import React from "react";
import cls from "./Modal.module.scss";
import { useDispatch } from "react-redux";
import { DeleteAction, SetTodosAction } from "../../Redux/todoReducer";
import axios from "axios";
import { todoServers } from "../../API/todoApi";

const Modal = ({ id, item, setDeletedId, BASE_URL }) => {
  const dispatch = useDispatch();
  const deleteItem = (id) => {
    todoServers.delete(id).then(() => {
      dispatch(DeleteAction(id));
      todoServers
        .get()
        .then((response) => dispatch(SetTodosAction(response.data?.reverse())))
        .catch((error) => console.log(error));
    });
  };

  const cancelItem = () => {
    setDeletedId("");
  };
  return (
    <div className={cls.modal}>
      <div className={cls.wrapper}>
        <h1>
          Are sure to delete this <br />"{item.value}" <br /> list
        </h1>
        <div className={cls.buttons}>
          <button onClick={() => deleteItem(id)} className={cls.yes}>
            yes
          </button>
          <button onClick={cancelItem} className={cls.no}>
            no
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
