const Index = () => {
  if (window.innerWidth < 480) return;
  const NavbarUnderline = document.getElementById("header__underline");

  function setActiveItem(activeItem) {
    if (!activeItem) return;
    if (!activeItem.classList.contains("header__item")) return;

    const { left, width } = activeItem.getBoundingClientRect();
    NavbarUnderline.style.left = `${left}px`;
    NavbarUnderline.style.width = `${width}px`;
    setTimeout(() => {
      NavbarUnderline.style.opacity = 1;
    }, 200);
  }

  const activeLink = document.querySelector(".header__link--active");
  if (activeLink) {
    setTimeout(() => {
      setActiveItem(activeLink.parentElement);
    }, 200);
  }

  window.addEventListener("hashchange", () => {
    const newActiveLink = document.querySelector(`[href="${location.hash}"]`);
    if (newActiveLink) {
      document.querySelector(".header__link--active")?.classList.remove("header__link--active");
      newActiveLink.classList.add("header__link--active");
      setActiveItem(newActiveLink.parentElement);
    }
  });

  window.addEventListener("resize", () => {
    const activeLink = document.querySelector(".header__link--active");
    if (activeLink) {
      setActiveItem(activeLink.parentElement);
    }
  });
};

export default Index;
