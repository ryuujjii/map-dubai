import { setItemToSessionStorage, getItemFromSessionStorage, removeItemFromSessionStorage, dispatchCustomEvent } from 'utils';

export default function onEsc() {
  removeItemFromSessionStorage('esc-items');

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
      onEscHandler();
    }
  });
};

function onEscHandler() {
  const collection = getItemFromSessionStorage('esc-items');
  if (collection?.length) {
    const last = collection.pop();
    dispatchCustomEvent({ el: window, event: last });
    setItemToSessionStorage('esc-items', collection);
  } else {
    console.log('there is no collection');
  }
}