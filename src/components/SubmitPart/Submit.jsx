import React, { useRef, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import "boxicons";

// components
import cls from "./submit.module.scss";
import TodoList from "../TodoList/TodoList";
import EmptyImage from "../EmptyImage/EmptyImage";
import PaginationItem from "../Pagination/PaginationItem";
import Warning from "../Warning/Warning";

const Submit = () => {
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [warning, setWarning] = useState(false);

  // For Pagination items
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  console.log(todos);

  // Filter functions
  const selectFilter = (todos, status) => {
    switch (status) {
      case "completed":
        return todos.filter((v) => v.isDone);
      case "proccess":
        return todos.filter((v) => !v.isDone);
      default:
        return todos;
    }
  };

  const handClick = (event) => {
    event.preventDefault();
    const Inputvalue = event.target["list"].value;
    if (!Inputvalue == "" && !todos.find((todo) => todo?.value === Inputvalue)?.value) {

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
      setTodos([newTodo, ...todos]);
      event.target.reset();
    }else{
     setWarning(true);
    }
  };

  const TodosElem = selectFilter(todos, status)
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
    ));

  const InputRef = useRef();

  return (
    <Container fixed sx={{ padding: "5px" }}>
      <div className={cls.block}>
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
          <button type="submit" className={cls.add}>
            Add
          </button>
        </form>

        <span className={cls.line}></span>

        <div className={cls.container}>
          <div className={cls.filter_wrapper}>
            <h2 className={cls.title}>Filter by status:</h2>

            <select
              name="filter"
              id="filter"
              className={cls.selection}
              onChange={(event) => {
                setStatus(event.target.value);
                console.log(event.target.value);
              }}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="proccess">Proccess</option>
            </select>
          </div>

          <ul className={cls.todos_list}>
            {todos.length == 0 ? <EmptyImage /> : TodosElem}
          </ul>

          <PaginationItem
            totalPosts={todos.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            setPostsPerPage={setPostsPerPage}
            currentPage={currentPage}
          />

          <div className={cls.clear} onClick={() => setTodos([])}>
            Clear all
          </div>
        </div>

      </div>
        {warning ? <Warning setWarning={setWarning}/> : null}
    </Container>
  );
};

export default Submit;
