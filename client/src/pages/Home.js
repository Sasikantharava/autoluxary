import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Showcase from '../components/sections/Showcase';
import Services from '../components/sections/Services';
import Reviews from '../components/sections/Reviews';
import Gallery from '../components/sections/Gallery';
import Contact from '../components/sections/Contact';
import ContactFloatingButtons from '../components/ui/ContactFloatingButtons';


const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Showcase />
      <Services />
      <Reviews />
      <Gallery />
      <Contact />
      <ContactFloatingButtons />
    </>
  );
};

export default Home;