const MoveCar = () => {
  const wheelElements = document.querySelectorAll(".range__car-image--wheel");
  if (typeof window !== "undefined" && typeof window.IntersectionObserver === "undefined") {
    wheelElements.forEach((entry) => entry.classList.add("range__car-image--wheel-accelerate"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("range__car-image--wheel-accelerate");
        } else {
          entry.target.classList.remove("range__car-image--wheel-accelerate");
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }
  );

  wheelElements.forEach((wheel) => {
    observer.observe(wheel);
  });
};

export default MoveCar;
