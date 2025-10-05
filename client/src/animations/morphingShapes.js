export const initMorphingShapes = () => {
  const morphingElements = document.querySelectorAll('.morphing-shape');
  
  // Add morphing animation class to elements
  morphingElements.forEach((element, index) => {
    element.style.animation = `morph ${15 + index * 5}s ease-in-out infinite`;
    if (index > 0) {
      element.style.animationDelay = `${index * 2}s`;
    }
  });
  
  // Add CSS animation if not already present
  if (!document.querySelector('#morphing-animations')) {
    const style = document.createElement('style');
    style.id = 'morphing-animations';
    style.textContent = `
      @keyframes morph {
        0% { border-radius: 50%; transform: rotate(0deg) scale(1); }
        25% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; transform: rotate(90deg) scale(1.1); }
        50% { border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%; transform: rotate(180deg) scale(1); }
        75% { border-radius: 30% 70% 70% 30% / 70% 30% 30% 70%; transform: rotate(270deg) scale(0.9); }
        100% { border-radius: 50%; transform: rotate(360deg) scale(1); }
      }
    `;
    document.head.appendChild(style);
  }
};