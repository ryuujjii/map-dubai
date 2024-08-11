import collectEscEls from '@/components/esc/collectEscEls';
import removeLastEscEl from '@/components/esc/removeLastEscEl';

import { addClassName, removeClassName } from 'utils';
export default function projectPopup() {
  window.addEventListener("show-project", (e) => {
    addClassName(document.body, 'open-project');
    collectEscEls('close-project');
  });

  window.addEventListener('close-project', (e) => {
    removeClassName(document.body, 'open-project');
    removeLastEscEl('close-project');
  });
};
