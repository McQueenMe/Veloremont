window.addEventListener("scroll", function () {
   let header = document.getElementById("main-header");
   if (window.scrollY > 50) {
      header.classList.add("sticky");
   } else {
      header.classList.remove("sticky");
   }
});

document.addEventListener("DOMContentLoaded", function () {
   const carouselInner = document.querySelector("#reviewCarousel .carousel-inner");
   const items = document.querySelectorAll("#reviewCarousel .carousel-item");

   // Сначала делаем все .carousel-item видимыми временно
   items.forEach(item => item.style.display = "block");

   // Получаем максимальную высоту
   let maxHeight = 0;
   items.forEach(item => {
      const height = item.offsetHeight;
      if (height > maxHeight) {
         maxHeight = height;
      }
   });

   // Скрываем все, кроме активного
   items.forEach(item => item.style.display = "");

   // Устанавливаем максимальную высоту на carousel-inner
   carouselInner.style.height = maxHeight + "px";

   // Обновлять при ресайзе окна
   window.addEventListener("resize", () => {
      let newMax = 0;
      items.forEach(item => item.style.display = "block");
      items.forEach(item => {
         const height = item.offsetHeight;
         if (height > newMax) {
            newMax = height;
         }
      });
      items.forEach(item => item.style.display = "");
      carouselInner.style.height = newMax + "px";
   });
});


document.addEventListener("DOMContentLoaded", function () {
   const serviceItems = document.querySelectorAll(".service-item");

   function revealServices() {
      const triggerBottom = window.innerHeight * 0.85;

      serviceItems.forEach((item) => {
         const itemTop = item.getBoundingClientRect().top;
         if (itemTop < triggerBottom) {
            item.classList.add("show");
         }
      });
   }

   window.addEventListener("scroll", revealServices);
   revealServices();
});


/*-----------------Форма---------------- */
document.getElementById("contactForm").addEventListener("submit", validateForm);

function validateForm(event) {
   event.preventDefault();
   const form = document.getElementById("contactForm");

   const name = document.getElementById("name").value.trim();
   const phone = document.getElementById("phone").value.trim();
   const service = document.getElementById("service").value;
   const email = document.getElementById("email").value.trim();
   const comment = document.getElementById("comment").value.trim();

   const phonePattern = /^\+?\d{10,15}$/;

   // Проверка обязательных полей
   if (!name || !phone || !service) {
      showToast("errorToast", "❌ Заповніть всі обов'язкові поля (Ім'я, Телефон, Послуга).");
      form.classList.add("was-validated");
      return;
   }

   // Проверка номера
   if (!phonePattern.test(phone)) {
      showToast("errorToast", "❌ Введіть коректний номер телефону у форматі +380XXXXXXXXX.");
      form.classList.add("was-validated");
      return;
   }

   const templateParams = {
      name,
      phone,
      service,
      email,
      comment
   };

   emailjs.send("test", "template_7td15uc", templateParams)
      .then(function () {
         showToast("successToast", "✅ Повідомлення надіслано успішно!");
         form.reset();
         form.classList.remove("was-validated");
      }, function () {
         showToast("errorToast", "❌ Сталася помилка при надсиланні. Спробуйте ще раз.");
      });
}

function showToast(id, message) {
   const toast = document.getElementById(id);
   toast.querySelector("span").textContent = message;
   toast.style.display = "block";
   toast.style.animation = "slideIn 0.4s ease forwards";

   // Автозакрытие с анимацией
   setTimeout(() => {
      closeToast(id);
   }, 5000);
}

function closeToast(id) {
   const toast = document.getElementById(id);
   toast.style.animation = "slideOut 0.4s ease forwards";
   setTimeout(() => {
      toast.style.display = "none";
   }, 400); // дождаться окончания анимации
}

