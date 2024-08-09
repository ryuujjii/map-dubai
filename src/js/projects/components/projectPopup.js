import { addClassName, removeClassName } from 'utils';
export default function projectPopup() {
  window.addEventListener("show-project", (e) => {
    showProject();
  });
  const closeBtn = document.querySelector("[data-project-close]");

  closeBtn.addEventListener("click", (e) => {
    removeClassName(document.body, 'open-project');
  });
};


function showProject() {
  addClassName(document.body, 'open-project');
}