export default function showProjects() {
  let showProjects = document.querySelector(".project__popupBtns-open");
  let projectsWrapper = document.querySelector(".project__popupBtns-wrapper");
  showProjects.addEventListener("click", () => {
    projectsWrapper.classList.toggle("activee");
  });
  window.addEventListener("wheel", (e) => {
    projectsWrapper.classList.remove("activee");
  });
  document.addEventListener("click", (e) => {
    if (e.target.closest(".project__popupBtns-wrapper")) {
      return;
    }
    projectsWrapper.classList.remove("activee");
  });
}
