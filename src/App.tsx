import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import PlayingBar from "./components/view/PlayingBar";
import HomePage from "./pages/HomePage";
import SettingsBar from "./components/SettingsBar";
import "./styles/main.scss";

function App() {
  return (
    <Router>
      <main>
        <SettingsBar />
        <NavBar />
        <div className="main-view">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
        <PlayingBar />
      </main>
    </Router>
  );
}

export default App;
