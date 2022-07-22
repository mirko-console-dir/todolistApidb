import React, { useRef, useEffect } from "react";
import { useLocation, useParams, useRouteMatch } from "react-router-dom";
import Edit from "../../components/AddElement";
import { useUpdateListMutation } from "../../service/listsService";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const EditList = () => {
  const history = useHistory();
  /* ricordarsi un oggetto è tale quando dobbiamo fare una get */
  const [updateList, { isSuccess, error, isError }] = useUpdateListMutation();
  /* creaiamo un ref per aggiungere le funzionalità */
  const listEl = useRef("");

  let { list_id } = useParams();
  list_id = Number(list_id);
  const { search } = useLocation();
  const pars = new URLSearchParams(search);
  let list_name;
  if (pars) {
    list_name = pars.get("list_name") ?? "";
  }
  /* mettere qui i riferimenti per current.value con il nome della lista che ci viene passato */
  const manageClick = (evt) => {
    evt.preventDefault();
    updateList({ name: listEl.current.value, id: list_id });
  };
  /* useEffect lo fa solo la prima volta al Mounted DEL componente */
  useEffect(() => {
    if (list_name) {
      listEl.current.value = list_name;
    }
    /* con hook history abbiamo un oggetto con delle proprietà di cui possiamo usare i metodi e in questo caso rimpiazzare l'url */
    if (isSuccess) {
      history.replace("/lists");
    }
    console.log("response", error, isSuccess, isError);
    /* veridicare eventuali errori che vedremo in console. il cors error indica che il server non è abilitato, ad esempio possiamo creare questo errore mandano giù il server e cercando di fare la edit */
    if (error) {
      toast.error(error.error);
    }
    return () => {};
  }, [isSuccess, error]);

  return (
    <div>
      <h1>Edit list</h1>
      <Edit Ele={listEl} txtButton={"Edit list"} manageClick={manageClick} />
    </div>
  );
};

export default EditList;
