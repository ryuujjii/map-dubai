export default function showProjects() {
  let showProjects = document.querySelector(".project__popupBtns-open");
  let projectsWrapper = document.querySelector(".project__popupBtns-wrapper");
  showProjects.addEventListener("click", () => {
    projectsWrapper.classList.toggle("active");
  });
  window.addEventListener("wheel", (e) => {
    projectsWrapper.classList.remove("active");
   
  });
}
