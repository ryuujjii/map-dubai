import collectEscEls from '@/components/esc/collectEscEls';
import removeLastEscEl from '@/components/esc/removeLastEscEl';
import projectContent from "@/projects/components/content/projectContent";
import { addClassName, removeClassName } from 'utils';

export default function projectPopup() {
  let activeProject = null;
  const loaderAniDuration = 1000;
  let isLoaderActive = false;
  let loaderActiveChecker = null;

  window.addEventListener("show-project", (e) => {
    if (!activeProject || activeProject !== e.detail.projectId) {
      // isLoaderActive = true;
      // removeClassName(document.documentElement, 'preloader-hidden');
      projectContent(e.detail.projectId);
      showProject(e.detail.projectId);
      // setTimeout(() => {
      //   showProject(e.detail.projectId);
      // }, loaderAniDuration);
    } else {
      showProject(e.detail.projectId);
    }
  });

  window.addEventListener('close-project', (e) => {
    removeClassName(document.body, 'open-project');
    removeLastEscEl('close-project');
  });
  window.addEventListener('project-media-loaded', (e) => {
    if (!isLoaderActive) {
      clearInterval(loaderActiveChecker);
      setInterval(() => {
        if (isLoaderActive) {
          clearInterval(loaderActiveChecker);
          isLoaderActive = false;
          setTimeout(() => {
            addClassName(document.documentElement, 'preloader-hidden');
          }, 1000);
        }
      }, 1000);
    } else {
      setTimeout(() => {
        addClassName(document.documentElement, 'preloader-hidden');
      }, 1000);
    }
  });

  function showProject(projectId) {
    activeProject = projectId;
    addClassName(document.body, 'open-project');
    collectEscEls('close-project');
  }
};