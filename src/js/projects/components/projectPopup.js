import collectEscEls from '@/components/esc/collectEscEls';
import removeLastEscEl from '@/components/esc/removeLastEscEl';
import projectContent from "@/projects/components/content/projectContent";

import { addClassName, removeClassName } from 'utils';
export default function projectPopup() {
  let activeProject = null;
  window.addEventListener("show-project", (e) => {
    if (!activeProject || activeProject !== e.detail.projectId) {
      projectContent(e.detail.projectId);
    }
    activeProject = e.detail.projectId;
    addClassName(document.body, 'open-project');
    collectEscEls('close-project');
  });

  window.addEventListener('close-project', (e) => {
    removeClassName(document.body, 'open-project');
    removeLastEscEl('close-project');
  });
};
