import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"; // global styles

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";

import NotFound from "./components/NotFound/NotFound"; // 404 page

import Apps from "./apps/apps"; // main apps page & dynamic handler

import Secret from "./secret/secret"; // secret page

function App() {
  document.title = "Srinivas Charan K | Portfolio"; // Set the document title
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apps" element={<Apps />} />
        <Route path="/apps/:appName" element={<Apps />} />
        <Route path="/secret" element={<Secret /> } />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
