import { setItemToSessionStorage, getItemFromSessionStorage } from 'utils';

export default function collectEls(el) {
  const collection = getItemFromSessionStorage('esc-items') ? getItemFromSessionStorage('esc-items') : [];
  collection.push(el);
  setItemToSessionStorage('esc-items', collection);
};