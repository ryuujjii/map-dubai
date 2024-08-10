import collectEls from '@/components/esc/collectEls';
import removeLast from '@/components/esc/removeLast';

import { addClassName, removeClassName } from 'utils';
export default function projectPopup() {
  window.addEventListener("show-project", (e) => {
    addClassName(document.body, 'open-project');
    collectEls('close-project');
  });

  window.addEventListener('close-project', (e) => {
    removeClassName(document.body, 'open-project');
    removeLast();
  });
};
