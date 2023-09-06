function throttle(func, wait) {
    var lastFunc;
    var lastRan;
    return function() {
        var context = this;
        var args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= wait) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, wait - (Date.now() - lastRan));
        }
    };
}

let lastScrollTop = 0;
const tolerance = 100;  // Adjust this value based on your needs. This means navbar will react after 50 pixels of scroll

const handleNavbar = throttle(function() {
    // Detects if on mobile view
    if(window.innerWidth <= 768) {
        let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        // Check for tolerance
        if (Math.abs(lastScrollTop - currentScrollTop) <= tolerance) return;
        
        if (currentScrollTop > lastScrollTop){
            // Scrolling down
            document.querySelector(".navbar").classList.add("hide");
        } else {
            // Scrolling up
            document.querySelector(".navbar").classList.remove("hide");
        }
        lastScrollTop = currentScrollTop;
    }
}, 200);  // Throttle for 200 milliseconds. You can adjust this value as needed

window.addEventListener("scroll", handleNavbar, false);
