import { addClassName, removeClassName } from 'utils';
export default function hoverHandler() {
  const hoverEls = document.querySelectorAll('[data-hover-id]');
  const hoverTargets = [...document.querySelectorAll('[data-hover-target]')].reduce((acc, el) => {
    acc[el.getAttribute("data-hover-target")] = el;
    return acc;
  }, {});
  let activeHoverEl = null;
  hoverEls.forEach(hoverEl => {
    hoverEl.addEventListener("mouseenter", (e) => {
      activeHoverEl = hoverTargets[hoverEl.getAttribute("data-hover-id")];
      addClassName(activeHoverEl);
    });
    hoverEl.addEventListener("mouseleave", (e) => {
      removeClassName(activeHoverEl);
      activeHoverEl = null;
    });
  });
};
