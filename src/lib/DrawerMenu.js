const DrawerMenu = () => {
  let menuOpen = false;
  const burgerMenu = document.getElementById("burger-menu");
  const burgerInput = document.getElementById("burger-input");
  const headerLogoContainer = document.getElementById("header-logo");
  const headerNav = document.querySelector(".header__nav");

  burgerMenu.addEventListener("click", (e) => {
    e.preventDefault();
    burgerInput.checked = !burgerInput.checked;
    menuOpen = !menuOpen;
    headerLogoContainer.classList.toggle("drawer-menu--active");
    headerNav.classList.toggle("drawer-menu--active");
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      burgerInput.checked = false;
      menuOpen = false;
      headerLogoContainer.classList.remove("drawer-menu--active");
      headerNav.classList.remove("drawer-menu--active");
    }
  });
};

export default DrawerMenu;
