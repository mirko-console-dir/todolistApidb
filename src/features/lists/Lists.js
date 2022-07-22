import List from "./List";
import {
  useGetListsQuery,
  useDeleteListMutation,
  useAddListMutation,
} from "../../service/listsService";
import { toast } from "react-toastify";
import React, { useEffect, useRef } from "react";
/* ecco il componente reiciclabile per lists e myTodos e importare gli hook per la nuova lista  */
import AddList from "../../components/AddElement";

/* mettiamo qui i dati del componente Lists */
const Lists = () => {
  /* riferimento per l'add della lista  */
  const listEl = useRef("");
  const {
    data: lists = [],
    error,
    isLoading,
    isFetching,
    refetch:
      reloadLists /* se vogliamo rieseguire la query cos' che la UI veda i cambiamenti */,
  } = useGetListsQuery();

  /* quando eseguiamo usMutation non esegue subito la query ma ritorna una funzione come primo parametro per eseguire la funzione, tutti i metoti di mutation, guarda in documentazione, andare poi in List e destrutturare il metodo */
  const [
    removeList,
    { isLoading: isDeleting, isSuccess, error: deleteError, isError },
  ] = useDeleteListMutation();
  /* ecco useAddMutation per catturare l'hook */
  const [
    addList,
    {
      isLoading: isAdding,
      isSuccess: isAddSuccess,
      error: addError,
      isError: isAddError,
    },
  ] = useAddListMutation();

  useEffect(() => {
    /* isLoading lo fa solo la prima volta che si carica la query isFetching lo carica sempre */
    if (error) {
      toast.error(error);
    }
    if (isFetching) {
      toast.info("Loading lists");
    }
    if (!isFetching) {
      toast.dismiss();
    }
    return () => {};
  }, [
    error,
    isFetching,
  ]); /* qui inserire cosa deve cambiare perchè ritorni a fare il lavoro */

  const manageClick = (evt) => {
    evt.preventDefault();

    /* fino a quando non abbiamo il backend aggiongiamo qui i details, se avessimo backend non sarebbe necessario user id e la lista di riferimento */
    addList({ name: listEl.current.value, user_id: 1 });
  };
  /* qui indichiame se è andato a buon fine puliamo qui e ricarichiamo la pag */
  if (isAddSuccess) {
    listEl.current.value = "";
  }
  return (
    <>
      <h1>My lists</h1>
      <AddList Ele={listEl} manageClick={manageClick} txtButton={"Add list"} />
      <ul className="list-group list-group-flush" id="ListList">
        {lists.map((list) => (
          <List onRemoveList={removeList} key={list.id} list={list} />
        ))}
      </ul>
    </>
  );
};
export default Lists;
