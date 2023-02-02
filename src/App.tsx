import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import PlayingBar from "./components/view/PlayingBar";
import HomePage from "./pages/HomePage";
import "./styles/main.scss";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <Router>
      <main>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search_page" element={<SearchPage/>} />
        </Routes>
      </main>
      <PlayingBar/>
    </Router>
  );
}

export default App;
