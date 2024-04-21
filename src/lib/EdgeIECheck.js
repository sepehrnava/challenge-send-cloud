const EdgeGapSupportVersion = 84;

const CheckEdgeAndIE = () => {
  let userAgent = navigator.userAgent;

  // IE11
  let isIE11 = /Trident\/.*rv:11/.test(userAgent);

  // Edge Legacy
  let isEdgeUnder84 = false;
  if (/Edge\//.test(userAgent)) {
    isEdgeUnder84 = parseFloat(userAgent.split("Edge/")[1]) < EdgeGapSupportVersion;
  } else if (/Edg\//.test(userAgent)) {
    isEdgeUnder84 = parseFloat(userAgent.split("Edg/")[1]) < EdgeGapSupportVersion;
  }

  let loadCSS = false;

  if (isIE11 || isEdgeUnder84) {
    loadCSS = true;
  }

  if (loadCSS) {
    let link = document.createElement("link");
    link.href = "/styles/EdgeIE.css";
    link.type = "text/css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
};

export default CheckEdgeAndIE;
