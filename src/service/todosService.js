import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TODO_URL } from "../config";
// Define a service using a base URL and expected endpointsexport
export const todosApi = createApi({
  reducerPath: "todos",
  tagTypes: ["TODOS"],
  baseQuery: fetchBaseQuery({
    baseUrl: TODO_URL,
  }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      /* passare come parametro alla query la list_id */
      query: (list_id = "") => "?list_id=" + list_id,
      providesTags: (result, error) => {
        if (error || !result) {
          return [{ type: "TODOS" }];
        }
        return result.map((ele) => ({ type: "TODOS", id: ele.id }));
      },
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: "/" + id,
        method: "DELETE",
      }),

      invalidatesTags: ["TODOS"], // (result,error, id) => {type:'LIST', id:id}
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: "",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["TODOS"],
    }),
    updateTodo: builder.mutation({
      query: ({ id, ...body }) => ({
        url: "/" + id,
        method: "PATCH",
        body,
      }),

      invalidatesTags: ["TODOS"], // (result,error, id) => {type:'LIST', id:id}
    }),
  }),
});

export const {
  useUpdateTodoMutation,
  useAddTodoMutation,
  useGetTodosQuery,
  useDeleteTodoMutation,
} = todosApi;
