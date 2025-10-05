export const initGradientAnimations = () => {
  const gradientElements = document.querySelectorAll('.gradient-bg');
  
  // Add gradient animation class to elements
  gradientElements.forEach(element => {
    element.style.backgroundSize = '200% 200%';
    element.style.animation = 'gradientShift 10s ease infinite';
  });
  
  // Add CSS animation if not already present
  if (!document.querySelector('#gradient-animations')) {
    const style = document.createElement('style');
    style.id = 'gradient-animations';
    style.textContent = `
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(style);
  }
};