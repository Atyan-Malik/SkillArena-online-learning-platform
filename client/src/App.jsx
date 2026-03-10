import React from "react";
import MainLayout from "./layout/MainLayout.jsx";
import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </div>
  );
};

export default App;
