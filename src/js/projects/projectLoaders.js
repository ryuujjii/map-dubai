import { queryMatches, dispatchCustomEvent } from 'utils';
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
    dispatchCustomEvent({
      el: window, event: "change-logo", detail: {
        projectId: e.detail.projectId
      }
    });
  });
  window.addEventListener('change-logo', (e) => {
    const projectId = e.detail.projectId;
    changeLogo(projectId);
  });

  function changeLogo(projectName) {
    preloaderLogoImg.src = '';
    preloaderLoadingImg.src = '';
    preloaderVal.classList.add('in-project');
    if (queryMatches(769, 'min')) {
      preloaderVal.style.setProperty(
        '--setSize-img',
        `${(projects[projectName].projectLogo.width * 100) / 1440}vw`
      );
    } else {
      preloaderVal.style.setProperty(
        '--setSize-img',
        `${projects[projectName].projectLogo.width -
        projects[projectName].projectLogo.width * 0.1
        }px`
      );
    }
    preloaderLogoImg.src = projects[projectName].projectLogo.logo;
    preloaderLoadingImg.src = projects[projectName].projectLogo.logo;
  }
}
