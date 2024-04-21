// check if the hero image is loaded and if 2 seconds have passed since
// the page was loaded, then hide the loading screen


const Loading = () => {
  const loading = document.getElementById("loading");
  const heroImage = document.querySelector("#hero-image"); 

  if (import.meta.env.DEV) {
    loading.classList.remove("loading--active");
    loading.style.display = "none";
  } else {
    const hideDelay = 2000;

    let imageLoaded = false;
    let timeElapsed = false;

    const checkConditionsAndRemoveClass = () => {
      if (imageLoaded && timeElapsed) {
        loading.classList.remove("loading--active");
      }
    };

    window.addEventListener("load", () => {
      setTimeout(() => {
        timeElapsed = true;
        checkConditionsAndRemoveClass();
      }, hideDelay);

      if (heroImage.complete && heroImage.naturalHeight !== 0) {
        imageLoaded = true;
        checkConditionsAndRemoveClass();
      } else {
        heroImage.addEventListener("load", () => {
          imageLoaded = true;
          checkConditionsAndRemoveClass();
        });
      }
    });

    // Fallback, if the image hasn't loaded after 7 seconds, remove the loading screen
    setTimeout(() => {
      loading.classList.remove("loading--active");
    }, 7000);
  }
};

export default Loading;
