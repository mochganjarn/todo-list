import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { todoApi } from "@/pages/todo/todoApi";
export const makeStore = () =>
  configureStore({
    reducer: {
      [todoApi.reducerPath]: todoApi.reducer,
    },
    middleware: (gDM) => gDM().concat(todoApi.middleware),
  });

export const wrapper = createWrapper(makeStore, { debug: true });