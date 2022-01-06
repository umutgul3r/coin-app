import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Pages from "./pages/Pages";
import Dash from "./components/Dash";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const watchtList = localStorage.getItem("fav");
  if (!watchtList) {
    localStorage.setItem("fav", JSON.stringify([]));
  }

  return (
    <Router>
      <div className="flex">
        <ToastContainer />
        <Dash />
        <Pages />
      </div>
    </Router>
  );
}

export default App;
