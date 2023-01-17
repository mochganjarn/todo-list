import React, { useState } from "react";
import { getRunningQueriesThunk, getTodoByList } from "./todoApi";
import { useGetTodoByListQuery } from "./todoApi";
import { useRouter } from "next/router";
import { wrapper } from "@/store/store";
import Navbar from "@/component/navbar";
import Card from "@/component/card";
import styles from "@/styles/Todo.module.css";
import ModalLoading from "@/component/loading";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function Pokemon() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [params, setParams] = useState({
    limit: limit,
    offset: (currentPage - 1) * limit,
  });
  const [todoItem, setTodoItem] = useState();
  const result = useGetTodoByListQuery(params);
  const { isLoading, error, data } = result;

  return (
    <>
      <Navbar></Navbar>
      <div className={styles.content}>
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <Fab onClick={()=>router.push("/todo/input")} aria-label="add">
            <AddIcon />
          </Fab>
          <h1>Todo List</h1>
        </div>
        <Card>
          {data?.map((val, index) => {
            return (
              <div className={styles.todoItem} key={index}>
                <div>{val.title}</div>
                <div>{typeof val.title}</div>
              </div>
            );
          })}
          <div className={styles.loadMore}>
            {currentPage > 1 && (
              <div
                onClick={() => {
                  setCurrentPage((page) => page - 1);
                  setParams({
                    ...params,
                    offset: (currentPage - 1 - 1) * limit,
                  });
                }}
              >
                Sebelumnya..
              </div>
            )}
            <div>Halaman {currentPage}</div>
            {currentPage < 20 && (
              <div
                onClick={() => {
                  setCurrentPage((page) => page + 1);
                  setParams({
                    ...params,
                    offset: (currentPage + 1 - 1) * limit,
                  });
                }}
              >
                Selanjutnya..
              </div>
            )}
          </div>
        </Card>
      </div>
      {isLoading && <ModalLoading />}
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    let limit = context.params?.limit;
    let offset = context.params?.offset;
    if (typeof limit === "undefined") {
      limit = 10;
    }

    if (typeof offset === "undefined") {
      offset = 0;
    }

    store.dispatch(getTodoByList.initiate({ limit, offset }));

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);
