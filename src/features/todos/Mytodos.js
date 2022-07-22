import Todos from "./Todos";
/* ecco il nostro bottone e possiamo metterlo nella feature Lists importandolo e usarlo come componente */
import AddTodo from "../../components/AddElement";
import FilterTodo from "./FilterTodo";
import ErrorBoundary from "../../components/ErrorBoundary";
import { useSelector, useDispatch } from "react-redux";
import { filterTodo } from "./filterSlice";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../../service/todosService";
import { useRef } from "react";
import { useLocation, useParams, useRouteMatch } from "react-router-dom";

const Mytodos = () => {
  const dispatch = useDispatch();
  /* CON QUESTO HOOK ABBIAMO ACCESSO AI PARAMETRI */
  let { list_id } = useParams();
  list_id = Number(list_id);
  const { search } = useLocation();
  /* usare oggetto del browser (come costruttore con 'new') per catturare l'oggetto con la proprietà */
  const pars = new URLSearchParams(search);
  /* catturare il valore/name della lista */
  const list_name = pars.get("list_name") ?? "";
  const todoEl = useRef("");
  const activeFilter = useSelector((state) => state.filter);

  const onFilterTodo = (filter) => {
    dispatch(filterTodo(filter));
  };

  const {
    data = [],
    error,
    isLoading,
    isFetching,
    refetch: reloadLists,
  } = useGetTodosQuery(list_id);

  const todos = data.filter((todo) => {
    if (activeFilter === "ALL") {
      return true;
    }
    if (activeFilter === "COMPLETED") {
      return todo.completed;
    }
    // default TODO
    return !todo.completed;
  });
  const [
    removeTodo,
    { isLoading: isDeleting, isSuccess, error: deleteError, isError },
  ] = useDeleteTodoMutation();

  const [
    addTodo,
    {
      isLoading: isAdding,
      isSuccess: isAddSuccess,
      error: addError,
      isError: isAddError,
    },
  ] = useAddTodoMutation();

  const [
    updateTodo,
    {
      isLoading: isUpdating,
      isSuccess: isUpdaeSuccess,
      error: updayeError,
      isError: isUpdateError,
    },
  ] = useUpdateTodoMutation();

  const manageClick = (evt) => {
    evt.preventDefault();
    addTodo({
      name: todoEl.current.value,
      created_at: new Date().toLocaleDateString(),
      user_id: 1,
      list_id,
    });
    todoEl.current.value = "";
  };
  /* catturare tutti i dati della rotta compresi i parametri */
  const { params } = useRouteMatch();

  return (
    /* utilizzare il fragment <> </> per legare all'app principale  */
    <>
      <h1>
        {" "}
        {list_name} {params?.list_id}
      </h1>
      <div className="col-md-6">
        <AddTodo Ele={todoEl} manageClick={manageClick} />
        <ErrorBoundary>
          <Todos
            removeTodo={removeTodo}
            updateTodo={updateTodo}
            todos={todos}
          />
        </ErrorBoundary>

        <FilterTodo filter={activeFilter} onFilter={onFilterTodo} />
      </div>
    </>
  );
};
export default Mytodos;
