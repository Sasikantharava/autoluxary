export const initFloatingAnimations = () => {
  const floatingElements = document.querySelectorAll('.floating');
  
  // Add floating animation class to elements
  floatingElements.forEach(element => {
    element.style.animation = `floating ${3 + Math.random() * 2}s ease-in-out infinite`;
    element.style.animationDelay = `${Math.random() * 2}s`;
  });
  
  // Add CSS animation if not already present
  if (!document.querySelector('#floating-animations')) {
    const style = document.createElement('style');
    style.id = 'floating-animations';
    style.textContent = `
      @keyframes floating {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
        100% { transform: translateY(0px); }
      }
    `;
    document.head.appendChild(style);
  }
};