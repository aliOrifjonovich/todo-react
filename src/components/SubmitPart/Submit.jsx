import React, { createContext, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import "boxicons";

// components
import cls from "./submit.module.scss";
import PaginationItem from "../Pagination/PaginationItem";
import Warning from "../Warning/Warning";
import TodoUlList from "../TodoULlist/TodoUlList";
import Form from "../Form/Form";
import { useDispatch, useSelector } from "react-redux";
import { ClearAction, SetTodosAction } from "../../Redux/todoReducer";
import { todoServers } from "../../API/todoApi";
import { useQueryClient } from "react-query";
export const Context = createContext();

const Submit = () => {
  const [status, setStatus] = useState("all");
  const [warning, setWarning] = useState(false);

  // For Pagination items
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  // const queryClients = useQueryClient();

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
  useEffect(() => {

    todoServers.get()
      .then((response) => dispatch(SetTodosAction(response.data?.reverse())))
      .catch((error) => console.log(error));
  }, []);
  return (
    <Context.Provider
      value={{
        todos,
        // setTodos,
        status,
        setStatus,
        warning,
        setWarning,
        currentPage,
        setCurrentPage,
        postsPerPage,
        setPostsPerPage,
        lastPostIndex,
        firstPostIndex,
        selectFilter,
      }}
    >
      <Container fixed sx={{ padding: "5px" }}>
        <div className={cls.block}>
          <Form />
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

            <TodoUlList />

            <PaginationItem />

            <div className={cls.clear} onClick={() => dispatch(ClearAction())}>
              Clear all
            </div>
          </div>
        </div>
        {warning ? <Warning setWarning={setWarning} /> : null}
      </Container>
    </Context.Provider>
  );
};

export default Submit;
