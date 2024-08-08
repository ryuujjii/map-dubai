export function mediaCopyRightFonts(link) {
  const preconnectLink = document.createElement("link");
  preconnectLink.rel = "preconnect";
  preconnectLink.href = "https://fonts.gstatic.com";
  preconnectLink.crossOrigin = true;
  const fontLink = document.createElement("link");
  fontLink.href =
    link;
  fontLink.rel = "stylesheet";
  document.head.appendChild(preconnectLink);
  document.head.appendChild(fontLink);
};
