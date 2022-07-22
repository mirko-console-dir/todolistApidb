import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LIST_URL } from "../config";
// Define a service using a base URL and expected endpointsexport
export const listsApi = createApi({
  reducerPath: "lists",
  tagTypes: ["LIST"],
  baseQuery: fetchBaseQuery({
    baseUrl: LIST_URL,
  }),
  endpoints: (builder) => ({
    /* Non ci sono parametri perchè avremo l'elenco di tutte le liste, il builder ritorna un oggetto con prop e valore , */
    getLists: builder.query({
      query: () => "",
      /* gli diciamo quale tag è di riferimento */
      providesTags: (result, error) => {
        /* possiamo anche ritornare un array di id di liste senza mettere tutta la lista, così se c'è un id e lo aggiorniamo la lista viene aggiornata e se cancelliamo un id della lista la lista viene aggioranta, per vedere l'esempio ecco qui come segue, se viene passato un errore quando la lista arriva ritorniamo direttamente l'oggetto type LIST in un array nel senso che invalidiamo tutta la lista altrimenti return in map di result che riceve l'elemento e ritorna (quando si ritorna un oggetto si mettono le tonde altrimenti le legge come grafe della funzione) che ritorna un nuovo array */
        /* specificare || !result  che quando la lista è vuota entra comunque nell'if */
        if (error || !result) {
          return [{ type: "LIST" }];
        }
        return result.map((ele) => ({ type: "LIST", id: ele.id }));
      },
    }),
    deleteList: builder.mutation({
      /* avvolgre nelle tonde l'oggetto che dobbiamo ritornare */
      query: (id) => ({
        url: "/" + id,
        method: "DELETE",
      }),

      invalidatesTags: ["LIST"], // (result,error, id) => {type:'LIST', id:id}
    }),
    /* in query passiamo un oggetto che qui chiamiamo list */
    addList: builder.mutation({
      query: (list) => ({
        url: "",
        method: "POST",
        body: list,
      }),
      invalidatesTags: ["LIST"],
    }),
    /* qui per cambiare il nome della lista , ci prendiamo l'id e poi il resto della prorpietà lo mettiamo dentro body*/
    updateList: builder.mutation({
      query: ({ id, ...body }) => ({
        url: "/" + id,
        method: "PATCH",
        body,
      }),

      invalidatesTags: ["LIST"], // (result,error, id) => {type:'LIST', id:id} , se non ci sono molti dati possiamo mettere un TAG generale
    }),
  }),
});
/* andare in store e importartare gli hook*/
export const {
  useUpdateListMutation,
  useAddListMutation,
  useGetListsQuery,
  useDeleteListMutation,
} = listsApi;
