export function getPaintedItems(parent, content, cb) {
  parent.innerHTML = '';
  content.forEach(item => {
    parent.innerHTML += cb(item);
  });
};

export function getProjectItem(dataName) {
  return document.querySelector(`[data-project="${dataName}"]`);
};


export function getHandleClassNames(el) {
  const elClassNames = el.className;

  return function handleClassNames(classNames) {
    el.className = elClassNames + " " + classNames.join(' ');
  };
}