import React, { useRef, useState } from "react";
import cls from "./todolist.module.scss";
import Modal from "../Modal/Modal";

const TodoList = ({ item, index, setTodos, todos }) => {
  const InputElem = useRef();
  const [disabled, setDisabled] = useState(false);
  const [deletedId, setDeletedId] = useState(false);
  const [changeValue, setChangeValue] = useState(item.value);

  const onChange = () => {
    setTodos((old) => {
      return old.map((v) =>
        v.id == item.id ? { ...v, isDone: !v.isDone } : v
      );
    });
  };
  const EditFn = () => {
    InputElem.current.disabled = false;
    InputElem.current.focus();
    setDisabled(true);
  };

  const TodoDelete = (id) => {
    setDeletedId(id);
    console.log("TodoDelete", id);
  };

  const CancelButton = () => {
    setChangeValue(item.value);
    setDisabled(false);
    InputElem.current.disabled = true;
  };

  const OnChangeValue = (e) => {
    setChangeValue(e.target.value);
  };
  const SaveButton = (e) => {
    setChangeValue(changeValue);
    InputElem.current.disabled = true;
    setDisabled(false);
  };

  return (
    <li className={cls.todo} draggable id={item.id}>
      <span className={cls.number}>{index + 1}</span>
      <div className={cls.todo_l}>
        <div className={cls.todo_date}>
          <span className="date">{item.date}</span>
          <span className="time">{item.time}</span>
        </div>
        <div className={cls.todo_header}>
          <input
            type="checkbox"
            className={cls.checkbox}
            onChange={(e) => onChange(e)}
          />
          <input
            value={changeValue}
            className="todo-input"
            type="text"
            onChange={(e) => OnChangeValue(e)}
            disabled
            ref={InputElem}
          />
          {disabled ? (
            <>
              <div className={cls.cancel} onClick={CancelButton}>
                <box-icon color="#fff" name="x-square" type="solid"></box-icon>
              </div>
              <div className={cls.save} onClick={(e) => SaveButton(e)}>
                <box-icon color="#fff" name="save"></box-icon>
              </div>
            </>
          ) : (
            <></>
          )}
          {!disabled ? (
            <div
              className={cls.edit}
              onClick={(e) => {
                EditFn(e);
              }}
            >
              <box-icon
                color="#fff"
                size="sm"
                name="pencil"
                type="solid"
              ></box-icon>
            </div>
          ) : (
            <></>
          )}

          <div className={cls.delete} onClick={(id) => TodoDelete(id)}>
            <box-icon color="#bc0606"  name="trash"></box-icon>
          </div>
        </div>
      </div>

      {deletedId ? (
        <Modal
          setDeletedId={setDeletedId}
          deletedId={deletedId}
          todos={todos}
          setTodos={setTodos}
          item={item}
        />
      ) : null}
    </li>
  );
};

export default TodoList;