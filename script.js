let currentIndex = 0;
let totalSlides = 8;
let totalImages = 9;
let slideImageOnClick = 100 / totalImages;

const updateActiveSlide = () => {
  document.querySelectorAll(".title").forEach((el, index) => {
    if (index === currentIndex) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
};

const handleSlider = () => {
  if (currentIndex < totalSlides) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }

  gsap.to(".slider-titles", {
    onStart: () => {
      setTimeout(() => {
        updateActiveSlide();
      }, 100);
      updateImages(currentIndex + 1);
    },
    x: `-${currentIndex * slideImageOnClick}%`,
    duration: 1.75,
    ease: "power4.out",
  });
};

const updateImages = (imgNumber) => {
  const imgTop = document.querySelectorAll(".top-images img")[imgNumber - 1];
  const imgBottom =
    document.querySelectorAll(".bottom-images img")[imgNumber - 1];

  gsap.set(imgTop, {
    clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
    transform: "scale(2.5)",
  });

  gsap.set(imgBottom, {
    clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
    transform: "scale(2.5)",
  });

  const updateTopImageZindex = () => {
    document.querySelectorAll(".top-images img").forEach((elem, i) => {
      if (i === imgNumber - 1) {
        elem.style.zIndex = "2";
      } else if (i === imgNumber - 2) {
        elem.style.zIndex = "1";
      } else {
        elem.style.zIndex = "0";
      }
    });
  };

  const updateBottomImageZindex = () => {
    document.querySelectorAll(".bottom-images img").forEach((elem, i) => {
      if (i === imgNumber - 1) {
        elem.style.zIndex = "2";
      } else if (i === imgNumber - 2) {
        elem.style.zIndex = "1";
      } else {
        elem.style.zIndex = "0";
      }
    });
  };

  updateTopImageZindex();
  updateBottomImageZindex();

  gsap.to([imgTop, imgBottom], {
    clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
    transform: "scale(1)",
    duration: 1.75,
    ease: "power4.out",
    stagger: 0.1,
  });
};

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", handleSlider);

  updateImages(1);
  updateActiveSlide();
});
