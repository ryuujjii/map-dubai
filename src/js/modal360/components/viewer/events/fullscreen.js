import { toggleClassToAlter } from '@/modal360/components/alterParentWindow';
import { toggleClassName } from 'utils';
export function fullscreen(viewerInstance) {
  viewerInstance.addEventListener('fullscreen', ({ data }) => {
    toggleClassName(document.documentElement, 'fullscreen-enabled');
    toggleClassToAlter();
  });
};
