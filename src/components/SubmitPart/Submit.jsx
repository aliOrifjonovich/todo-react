import React, { useRef, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import "boxicons";

// components
import cls from "./submit.module.scss";
import TodoList from "../TodoList/TodoList";
import EmptyImage from "../EmptyImage/EmptyImage";
import PaginationItem from "../Pagination/PaginationItem";

const Submit = () => {
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
  console.log(todos);


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
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  // console.log("currentTodos", currentTodos);

  const TodosElem = selectFilter(todos, status)
    .slice(firstPostIndex, lastPostIndex)
    .map((item, i) => (
      <TodoList
        key={item.id}
        item={item}
        index={i}
        setTodos={setTodos}
        todos={todos}
      />
    ));

  const InputRef = useRef();

  return (
    <Container fixed sx={{ padding: "5px" }}>
      <div id="block">
        <form
          form
          className={cls.form}
          onSubmit={(event) => handClick(event)}
          onClick={() => {
            InputRef.current.focus();
          }}
        >
          {todos.length == 0 ? (
            <span className={cls.error}>Please write something here!</span>
          ) : null}
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

          <Grid
            container
            spacing={2}
            sx={{
              border: "2px solid #fff",
              marginTop: "2px",
              borderRadius: "2rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: " .5rem 1.5rem",
            }}
          >
            <Grid
              item
              xs={12}
              md={6}
              sx={{ padding: "0 !important", fontSize: "1rem" }}
            >
              <h2 className={cls.title}>Filter by status:</h2>
            </Grid>
            <Grid item xs={12} md={6} sx={{ padding: "0 !important" }}>
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
            </Grid>
          </Grid>

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
    </Container>
  );
};

export default Submit;
