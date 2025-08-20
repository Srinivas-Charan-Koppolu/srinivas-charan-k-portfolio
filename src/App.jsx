import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"; // global styles

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";

import Apps from "./apps/apps"; // main apps page & dynamic handler

function App() {
  document.title = "Srinivas Charan K | Portfolio"; // Set the document title
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apps" element={<Apps />} />
        <Route path="/apps/:appName" element={<Apps />} /> {/* dynamic */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
