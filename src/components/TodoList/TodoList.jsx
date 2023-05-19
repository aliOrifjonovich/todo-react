import React, { useContext, useRef, useState } from "react";
import cls from "./todolist.module.scss";
import Modal from "../Modal/Modal";
import { useDispatch } from "react-redux";
import {
  CheckBoxAction,
  SaveAction,
} from "../../Redux/todoReducer";
import axios from "axios";
import { todoServers } from "../../API/todoApi";

const TodoList = ({ item, index, firstPostIndex }) => {
  const InputElem = useRef();
  const [disabled, setDisabled] = useState(false);
  const [deletedId, setDeletedId] = useState(false);
  const [changeValue, setChangeValue] = useState(item.value);
  const dispatch = useDispatch();

  const onChangeCheckbox = (id) => {
    dispatch(CheckBoxAction(id));
    setDisabled(false);
  };
  const EditFn = () => {
    InputElem.current.disabled = false;
    InputElem.current.focus();
    setDisabled(true);
  };

  const TodoDelete = (id) => {
    setDeletedId(true);
  };

  const CancelButton = () => {
    setChangeValue(item.value);
    setDisabled(false);
    InputElem.current.disabled = true;
  };

  const OnChangeValue = (e) => {
    setChangeValue(e.target.value);
    console.log(changeValue);
  };
  const SaveButton = (id, value) => {
    todoServers.update(id, value).then((response) => {
      console.log("Saved new value", response.data);
      dispatch(SaveAction(id, value));
      setDisabled(false);
      InputElem.current.disabled = true;
    });
  };

  return (
    <>
      <li className={cls.todo} draggable id={item.id}>
        <span className={cls.number}>{firstPostIndex + ++index}</span>
        <div className={cls.todo_l}>
          <div className={cls.todo_date}>
            <span className="date">{item.date}</span>
            <span className="time">{item.time}</span>
          </div>
          <div className={cls.todo_header}>
            <input
              type="checkbox"
              className={cls.checkbox}
              onClick={() => onChangeCheckbox(item.id)}
              checked={item.isDone}
              readOnly
            />
            <input
              value={changeValue}
              className={item.isDone ? `${cls.done}` : null}
              type="text"
              onChange={(e) => OnChangeValue(e)}
              disabled
              ref={InputElem}
            />
            {disabled ? (
              <>
                <div className={cls.cancel} onClick={CancelButton}>
                  <box-icon
                    color="#fff"
                    name="x-square"
                    type="solid"
                  ></box-icon>
                </div>
                <div
                  className={cls.save}
                  onClick={() => SaveButton(item.id, changeValue)}
                >
                  <box-icon color="#fff" name="save"></box-icon>
                </div>
              </>
            ) : (
              <></>
            )}
            {!item.isDone ? (
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
              <box-icon color="#bc0606" name="trash"></box-icon>
            </div>
          </div>
        </div>

        {deletedId ? (
          <Modal
            setDeletedId={setDeletedId}
            deletedId={deletedId}
            item={item}
            id={item.id}
          />
        ) : null}
      </li>
    </>
  );
};

export default TodoList;
