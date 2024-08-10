import { addClassName, removeClassName } from 'utils';
export default function projectPopup() {
  window.addEventListener("show-project", (e) => {
    addClassName(document.body, 'open-project');
  });

  window.addEventListener('close-project', (e) => {
    removeClassName(document.body, 'open-project');
  });
};
