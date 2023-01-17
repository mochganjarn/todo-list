// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
// Define a service using a base URL and expected endpoints
export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getTodoByName: builder.query({
      query: (name) => `todos/${name}`,
    }),
    getTodoByList: builder.query({
      query: (params) => `/todos?_start=${params.offset}&_limit=${params.limit}`,
    }),
    addTodo: builder.mutation({
      query(body) {
        return {
          url: `todos`,
          method: 'POST',
          body,
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetTodoByNameQuery,
  useGetTodoByListQuery,
  useAddTodoMutation,
  util: { getRunningQueriesThunk },
} = todoApi;

// export endpoints for use in SSR
export const { getTodoByName, getTodoByList } = todoApi.endpoints;
