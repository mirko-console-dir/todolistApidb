import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import "./App.css";

import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Mytodos from "./features/todos/Mytodos";

import Header from "./components/Header";

import Lists from "./features/lists/Lists";

import { ToastContainer } from "react-toastify";
import EditList from "./features/lists/EditList";
function App() {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="App container">
      <Router>
        <div className="row d-flex justify-content-center">
          <Header />
          {/* SWITCH CI PERMETTE di renderizzare un componente a seconda del path che gli diamo, per renderizzare il componente usare <ROUTE> */}
          <Switch>
            {/* indicare la rotta a cui viene renderizzaro il componente avvolto */}
            <Route path="/todos">
              <Mytodos />
            </Route>
            {/* catturare id della lista con placeholder :list_id e filtrare solo i todo di quella lista, andare in List e avvolgere in NavlINK */}
            <Route path="/lists/:list_id/todos">
              <Mytodos />
            </Route>
            <Route path="/lists/:list_id/edit">
              <EditList />
            </Route>
            {/* le parentesi indicano or perciò renderizza sia nella path index che in /lists il componente avvolto, exact come parametro c0si deve corrispondere esattamente con la barra come rotta, il componente lists può accedere alla store dato che la store è collegato al file index così da poterlo chiamare ovunque*/}
            <Route exact path="(/|/lists)">
              <Lists />
            </Route>
          </Switch>
        </div>
      </Router>
      {/* utilizzato per tutti i componenti il TOAST */}

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
