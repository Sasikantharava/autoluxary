export const initParallaxEffects = () => {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  const updateParallax = () => {
    const scrollY = window.scrollY;
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.5;
      const yPos = -(scrollY * speed);
      
      const parallaxBg = element.querySelector('.parallax-bg');
      if (parallaxBg) {
        parallaxBg.style.transform = `translateY(${yPos}px)`;
      }
    });
  };
  
  window.addEventListener('scroll', updateParallax);
  updateParallax(); // Initial check
};