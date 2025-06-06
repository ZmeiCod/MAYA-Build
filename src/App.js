import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Basket from "./pages/Basket";
import NotFound from "./pages/NotFound";
import "./scss/app.scss";
import Navigation from "./components/Navigation";

export const Context = React.createContext()

function App() {
  const [searchValue, setSearchValue] = React.useState()

  return (
    <Context.Provider value={{searchValue, setSearchValue}}>
      <Routes>
        <Route path="/" element={<Home/> } />
        <Route path="basket" element={<Basket />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Navigation/>
    </Context.Provider>
  );
}

export default App;