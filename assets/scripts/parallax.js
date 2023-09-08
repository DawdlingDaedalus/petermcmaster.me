let scrolled = 0;
let lastScrollY = window.scrollY;

function updateParallax() {
    const parallaxDiv = document.querySelector(".parallax-background");
    
    let position = scrolled * 0.7;
    
    parallaxDiv.style.transform = `translateY(${position}px)`;
    requestAnimationFrame(updateParallax);
}

document.addEventListener("scroll", function() {
    scrolled = window.scrollY;

    if (Math.abs(scrolled - lastScrollY) > 2) { // tweak this value for performance vs responsiveness
        lastScrollY = scrolled;
        requestAnimationFrame(updateParallax);
    }
}, { passive: true });

requestAnimationFrame(updateParallax);
