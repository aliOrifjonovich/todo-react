import React, { useContext, useRef } from "react";
import cls from "../SubmitPart/submit.module.scss";
import { Context } from "../SubmitPart/Submit";
import { useDispatch } from "react-redux";
import { AddAction, SetTodosAction } from "../../Redux/todoReducer";
import axios from "axios";
import { todoServers } from "../../API/todoApi";

const Form = () => {
  const { todos, setWarning } = useContext(Context);
  const dispatch = useDispatch();

  const handClick = (event) => {
    event.preventDefault();
    const Inputvalue = event.target["list"].value;
    if (
      !Inputvalue == "" &&
      !todos.find((todo) => todo?.value === Inputvalue)?.value
    ) {
      const newTodo = {
        value: Inputvalue,
        isDone: false,
        id: "a" + Date.now(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      // setTodos([newTodo, ...todos]);
      // dispatch(AddAction(newTodo));
      todoServers.post(newTodo).then((response) => {
        todoServers
          .get()
          .then((response) =>
            dispatch(SetTodosAction(response.data?.reverse()))
          )
          .catch((error) => console.log(error));
      });
      event.target.reset();
    } else {
      setWarning(true);
    }
  };

  const InputRef = useRef();
  return (
    <form
      form
      className={cls.form}
      onSubmit={(event) => handClick(event)}
      onClick={() => {
        InputRef.current.focus();
      }}
    >
      <input
        placeholder="Add your own lists"
        className={cls.input}
        type="text"
        name="list"
        ref={InputRef}
      />
      <div className={cls.buttons}>
        <button type="submit" className={cls.add}>
          Add
        </button>
        <button type="search" className={cls.search}>
          <box-icon size="sm" color="#fff" name="search-alt-2"></box-icon>
        </button>
      </div>
    </form>
  );
};

export default Form;
