import { Throttle } from "@/lib/Utils";

const AutoHideHeader = () => {
  const triggerThreshold = 100;
  const navbar = document.querySelector(".header__nav");
  const introSection = document.getElementById("intro");
  const headerImageContainer = document.getElementById("header-logo");
  const { height: headerHeight } = headerImageContainer.getBoundingClientRect();

  let lastScrollY = 0;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const { top } = introSection.getBoundingClientRect();

    // Toggle 'header__nav--active' class based on scroll direction and threshold
    if (currentScrollY > lastScrollY && currentScrollY > triggerThreshold) {
      navbar.classList.remove("header__nav--active");
    } else {
      navbar.classList.add("header__nav--active");
    }

    // To make the navbar text visible, add 'header__nav--light' class if the intro section reaches the top of the viewport
    if (top <= headerHeight) {
      navbar.classList.add("header__nav--light");
    } else {
      navbar.classList.remove("header__nav--light");
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener("scroll", Throttle(handleScroll, 50));
};

export default AutoHideHeader;
