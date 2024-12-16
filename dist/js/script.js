const navMobile = document.querySelector('.nav-mobile');
const burgerBtn = document.querySelector('.burger');
const navContainer = document.querySelector('.nav-container');

const handleNav = () => {
  navMobile.classList.toggle('nav-mobile-active');
  navContainer.classList.toggle('nav-container-active');
  burgerBtn.classList.toggle('burger-active');
};

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const indicators = document.querySelectorAll(".indicator");
  const titleElement = document.querySelector(".title");
  const descriptionElement = document.querySelector(".description");
  const linkElement = document.querySelector(".cta-link");
  let currentIndex = 0;
  let timer;

  // Lazy loading filmów za pomocą Intersection Observer
  const observerOptions = {
    root: null, // viewport
    rootMargin: "0px",
    threshold: 0.5, // 50% widoczności
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;

      if (entry.isIntersecting) {
        video.play(); // Odtwarzaj film, gdy jest widoczny
      } else {
        video.pause(); // Zatrzymaj film, gdy nie jest widoczny
        video.currentTime = 0; // Resetuj czas odtwarzania
      }
    });
  }, observerOptions);

  // Rejestracja wszystkich filmów w Intersection Observer
  slides.forEach((slide) => {
    if (slide.tagName === "VIDEO") {
      observer.observe(slide);
    }
  });

  const updateContent = (slide) => {
    const title = slide.getAttribute("data-title");
    const description = slide.getAttribute("data-description");
    const link = slide.getAttribute("data-link");

    titleElement.textContent = title;
    descriptionElement.textContent = description;
    linkElement.setAttribute("href", link);
  };

  const changeSlide = (index = null) => {
    if (index !== null) currentIndex = index;

    slides.forEach((slide, idx) => {
      if (idx === currentIndex) {
        slide.classList.add("active");
        if (slide.tagName === "VIDEO") slide.play();
        updateContent(slide); // Aktualizacja tytułu, opisu i linku
      } else {
        slide.classList.remove("active");
        if (slide.tagName === "VIDEO") {
          slide.pause();
          slide.currentTime = 0;
        }
      }
    });

    indicators.forEach((indicator, idx) => {
      if (idx === currentIndex) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });

    currentIndex = (currentIndex + 1) % slides.length;
  };

  const startSlider = () => {
    timer = setInterval(changeSlide, 18000); // Automatyczna zmiana co 18 sekund
  };

  const stopSlider = () => {
    clearInterval(timer); // Zatrzymanie automatycznego przełączania
  };

  // Obsługa kliknięcia na wskaźniki
  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      stopSlider();
      changeSlide(parseInt(indicator.dataset.index));
      startSlider();
    });
  });

  // Uruchomienie slidera
  changeSlide();
  startSlider();
});

// Obsługa nawigacji
burgerBtn.addEventListener('click', handleNav);

