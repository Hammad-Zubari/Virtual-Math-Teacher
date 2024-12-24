import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Component/Landing";
import Main from "./Component/MainPage";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
}


export default App;
