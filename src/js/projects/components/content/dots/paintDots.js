import { dispatchCustomEvent } from 'utils';
import dotsLayout from '@/projects/components/content/dots/dotsLayout';


function getPaintDotsFn() {
  const dotsParent = document.querySelector('[data-project="dots"]');

  return function paintDots(content) {
    dotsParent.innerHTML = '';
    content.forEach(item => {
      dotsParent.innerHTML += dotsLayout(item);
    });
    dispatchCustomEvent({ el: window, event: "dots-painted" });
  };
};


const paintDots = getPaintDotsFn();
export default paintDots;