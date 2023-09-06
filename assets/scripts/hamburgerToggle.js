const mobileMenuButton = document.getElementById("mobile-menu");
const navList = document.querySelector(".nav-list");
const navLinks = document.querySelectorAll(".nav-list a");
const navBrand = document.querySelector(".nav-brand");

mobileMenuButton.addEventListener("click", function() {
    navList.classList.toggle("active");
});

navLinks.forEach(function(link) {
    link.addEventListener("click", function() {
        navList.classList.remove("active");
    });
});

navBrand.addEventListener("click", function() {
    navList.classList.remove("active");
});