import collectEscEls from '@/components/esc/collectEscEls';
import removeLastEscEl from '@/components/esc/removeLastEscEl';
import projectContent from "@/projects/components/content/projectContent";
import { addClassName, removeClassName } from 'utils';
import getData from '@/projects/components/content/getData';

export default async function projectPopup() {
  let activeProject = null;
  const loaderAniDuration = 1000;
  let isLoaderActive = false;
  let loaderActiveChecker = null;
  let projectsInfo = await getProjectsInfo();
  window.addEventListener("show-project", (e) => {
    let projectName = e.detail.projectId;
    switch (projectsInfo[projectName]?.status) {
      case "active": {
        break;
      }
      default:
        projectName = 'business-bay-tower';
        break;
    }
    if (!activeProject || activeProject !== projectName) {
      isLoaderActive = true;
      removeClassName(document.documentElement, 'preloader-hidden');
      projectContent(projectName);
      setTimeout(() => {
        showProject(projectName);
      }, loaderAniDuration);
    } else {
      showProject(projectName);
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
      }, 2000);
    } else {
      setTimeout(() => {
        addClassName(document.documentElement, 'preloader-hidden');
      }, 2000);
    }
  });

  function showProject(projectId) {
    activeProject = projectId;
    addClassName(document.body, 'open-project');
    collectEscEls('close-project');
  }

  async function getProjectsInfo() {
    let projectsInfo;
    try {
      projectsInfo = await getData('projectsInfo');
    } catch (error) {
      projectsInfo = {};
    }
    return projectsInfo;
  }
};