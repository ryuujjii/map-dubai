import { setPropertyTo, addClassName, removeClassName } from 'utils';
function getShowActiveDots() {
  // const masterplan = document.querySelector('.masterplan');

  return function showActiveDots(newActive, oldActive) {
    const newActiveDots = document.querySelectorAll(`[data-modal360-category="${newActive.getAttribute("data-modal360-tab")}"]`);
    const oldActiveDots = document.querySelectorAll(`[data-modal360-category="${oldActive?.getAttribute("data-modal360-tab")}"]`);

    oldActiveDots ? oldActiveDots.forEach(dot => {
      removeClassName(dot);
    }) : null;
    
    newActiveDots.forEach(dot => {
      addClassName(dot);
    });
  };
};

const showActiveDots = getShowActiveDots();

export default showActiveDots;