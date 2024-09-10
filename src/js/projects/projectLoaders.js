export default function projectLoader(data) {
  const preloaderVal = document.querySelector('.preloader');
  const preloaderLogoImg = document.querySelector('.preloader__logo-img img');
  const preloaderLoadingImg = document.querySelector(
    '.preloader__logo-loading img'
  );
  const projects = data.reduce((acc, el) => {
    acc[el.dataTestName] = {
      projectLogo: el.projectLogo,
    };
    return acc;
  }, {});
  window.addEventListener('node-change', (e) => {
    const projectId = e.detail.projectId;
    changeLogo(projectId);
  });
  function changeLogo(projectName) {

    preloaderVal.classList.add('in-project');
    preloaderLogoImg.src = projects[projectName].projectLogo.stroke;
    preloaderLoadingImg.src = projects[projectName].projectLogo.fill;
  }
}
