export function getPaintedItems(parent, content, cb) {
  parent.innerHTML = '';
  content.forEach(item => {
    parent.innerHTML += cb(item);
  });
};
