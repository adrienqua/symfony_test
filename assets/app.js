import React from "react";
import reactDom from "react-dom";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Navbar from "./controllers/js/components/Navbar";
import HomePage from "./controllers/js/pages/HomePage";

// any CSS you import will output into a single css file (app.css in this case)
import "./styles/bootstrap.min.css";
import "./styles/app.css";

const App = () => {
  return (
    <HashRouter>
      <Navbar />

      <main className="container pt-5">
        <Routes>
          <Route path="/" component={HomePage} />
        </Routes>
        <HomePage />
      </main>
    </HashRouter>
  );
};

const rootElement = document.querySelector("#app");
reactDom.render(<App />, rootElement);
