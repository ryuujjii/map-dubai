
import { removeClassName, addClassName, toggleClassName } from 'utils';

export function alterParentWindow() {
  const parentHtml = window.parent.document.documentElement;
  const alterClass = 'alter-parent-window';
  return {
    addClassToAlter(className = alterClass) {
      addClassName(parentHtml, className);
    },
    removeClassToAlter(className = alterClass) {
      removeClassName(parentHtml, className);
    },
    toggleClassToAlter(className = alterClass) {
      toggleClassName(parentHtml, className);
    },
  };
};

export const { addClassToAlter, removeClassToAlter, toggleClassToAlter } = alterParentWindow();
