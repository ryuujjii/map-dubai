import { toggleClassToAlter } from '@/modal360/components/alter_parent_window';
import { toggleClassName } from 'utils';
export function fullscreen(viewerInstance) {
  viewerInstance.addEventListener('fullscreen', ({ data }) => {
    toggleClassName(document.documentElement, 'fullscreen-enabled');
    toggleClassToAlter();
  });
};
