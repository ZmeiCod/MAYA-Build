import "./index.css";
import { Context } from "./index";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import AppRouter from "./components/AppRouter";

const App = () => {
  const { user } = React.useContext(Context);

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      user.checkAuth();
    }
  }, [user]);

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default observer(App);
