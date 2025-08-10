import React from "react";

import Hero from "../components/Hero/Hero.jsx";
import About from "../components/About/About.jsx";
import Skills from "../components/Skills/Skills.jsx";
import Projects from "../components/Projects/Projects.jsx";
import Gallery from "../components/Gallery/Gallery.jsx";
import Contact from "../components/Contact/Contact.jsx";

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Gallery />
      <Contact />
    </>
  );
}

export default Home;
