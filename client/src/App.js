import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ScrollProgress from './components/common/ScrollProgress';
import Home from './pages/Home';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import { initScrollAnimations } from './animations/scrollAnimations';
import { initParallaxEffects } from './animations/parallaxEffects';
import { initFloatingAnimations } from './animations/floatingAnimations';
import { initGradientAnimations } from './animations/gradientAnimations';
import { initMorphingShapes } from './animations/morphingShapes';

function App() {
  useEffect(() => {
    // Initialize all animations
    // initScrollAnimations();
    // initParallaxEffects();
    // initFloatingAnimations();
    // initGradientAnimations();
    // initMorphingShapes();
  }, []);

  return (
    <Router>
      <div className="App">
        <ScrollProgress />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;