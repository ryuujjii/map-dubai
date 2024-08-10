import { setItemToSessionStorage, getItemFromSessionStorage } from 'utils';

export default function removeLast() {
  const collection = getItemFromSessionStorage('esc-items');
  const last = collection.pop();
  setItemToSessionStorage('esc-items', collection);
  return last;
};
