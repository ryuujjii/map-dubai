import hoverBgLayout from '@/projects/components/content/map/hoverBgLayout';
import { getPaintedItems } from '@/projects/components/content/utils';
import imgLoader, { removeItemFromLoader } from '@/projects/components/content/imgLoader';

export default function hoverTargets(parent, data) {
  const removeHandler = () => {
    removeItemFromLoader(...hoverTargets);
    window.removeEventListener('close-project', removeHandler);
  };
  getPaintedItems(parent, data, hoverBgLayout);
  const hoverTargets = document.querySelectorAll('[data-hover-target]');
  imgLoader(...hoverTargets);
  window.addEventListener('close-project', removeHandler);
};
