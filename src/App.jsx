import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"; // global styles

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";

import NotFound from "./components/NotFound/NotFound"; // 404 page

import Apps from "./apps/apps"; // main apps page & dynamic handler
import Secret from "./secret/secret"; // secret page
import B500 from "./B500/app";
import Projects from "./pages/Projects/Projects";

// New imports for Stories
import Stories from "./Stories/Stories.jsx"; // list of stories

import Klu from "./klu/Klu.jsx"; // KLU main page

function App() {
  document.title = "Srinivas Charan K | Portfolio"; // Set the document title
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/myapps" element={<Apps />} />
        <Route path="/myapps/:appName" element={<Apps />} />
        <Route path="/secret" element={<Secret />} />
        
        {/* New Routes for Stories */}
        <Route path="/stories" element={<Stories />} />
        <Route path="/stories/:id" element={<Stories />} />

        <Route path="/klu/*" element={<Klu />} />
        
        {/* <Route path="/B500" element={<B500 />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
