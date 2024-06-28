let currentIndex = 0;
let totalSlides = 8;

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
    x: `-${currentIndex * 11.1111}%`,
    duration: 1.75,
    ease: "power4.out",
  });
};

const updateImages = (imgNumber) => {
  const imgSrc = `./images/img${imgNumber}.jpg`;
  const imgTop = document.createElement("img");
  const imgBottom = document.createElement("img");

  imgTop.src = imgSrc;
  imgBottom.src = imgSrc;

  imgTop.style.clipPath = "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";
  imgBottom.style.clipPath = "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";

  imgTop.style.transform = "scale(2.5)";
  imgBottom.style.transform = "scale(2.5)";

  document.querySelector(".img-top").appendChild(imgTop);
  document.querySelector(".img-bottom").appendChild(imgBottom);

  gsap.to([imgTop, imgBottom], {
    clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
    transform: "scale(1)",
    duration: 1.75,
    ease: "power4.out",
    stagger: 0.1,
    onComplete: trimExcessImages,
  });
};

const trimExcessImages = () => {
  const selectors = [".img-top", ".img-bottom"];

  selectors.forEach((selector) => {
    const container = document.querySelector(selector);
    const images = Array.from(container.querySelectorAll("img"));
    const excessCount = images.length - 5;

    if (excessCount > 0) {
      images
        .slice(0, excessCount)
        .forEach((image) => container.removeChild(image));
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", handleSlider);

  updateImages(1);
  updateActiveSlide();
});
