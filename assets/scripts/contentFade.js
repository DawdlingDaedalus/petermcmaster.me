// Helper function to check if the element is in the viewport
function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    const triggerPoint = window.innerHeight * 0.85; // 15% up from the bottom
    return (
        rect.top <= triggerPoint &&
        rect.top + rect.height >= triggerPoint
    );
  }
  
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    sections.forEach(section => {
      if (isInViewport(section) && !section.classList.contains('visible')) {
        section.classList.add('visible');
      }
    });
  });
  