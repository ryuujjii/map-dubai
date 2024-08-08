export function appendCopyRightStylesForMedia(link) {
  const cssLink = document.createElement("link");
  const baseLink = 'style.css';
  cssLink.href = link + baseLink;
  cssLink.rel = "stylesheet";
  document.head.appendChild(cssLink);
};
