export const initScrollAnimations = () => {
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        element.classList.add('active');
      }
    });
  };
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check
  
  // Staggered animation
  const staggerItems = document.querySelectorAll('.stagger-item');
  
  const staggerOnScroll = () => {
    staggerItems.forEach((element, index) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        setTimeout(() => {
          element.classList.add('active');
        }, index * 100);
      }
    });
  };
  
  window.addEventListener('scroll', staggerOnScroll);
  staggerOnScroll(); // Initial check
};