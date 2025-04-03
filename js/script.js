window.addEventListener("scroll", function () {
   let header = document.getElementById("main-header");
   if (window.scrollY > 50) {
      header.classList.add("sticky");
   } else {
      header.classList.remove("sticky");
   }
});

document.addEventListener("DOMContentLoaded", function () {
   const services = document.querySelectorAll(".fade-in");

   function checkVisibility() {
      services.forEach((service) => {
         const rect = service.getBoundingClientRect();
         if (rect.top < window.innerHeight - 100) {
            service.classList.add("visible");
         }
      });
   }

   window.addEventListener("scroll", checkVisibility);
   checkVisibility();
});
