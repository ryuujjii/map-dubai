import { escCollection } from '@/components/globals';
import removeLastEscEl from '@/components/esc/removeLastEscEl';
import { dispatchCustomEvent } from 'utils';
export default function onEsc() {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
      onEscHandler();
    }
  });
};

function onEscHandler() {
  if (escCollection?.length) {
    const last = removeLastEscEl('esc');
    dispatchCustomEvent({ el: window, event: last });
  } else {
    console.log('there is no collection');
  }
}