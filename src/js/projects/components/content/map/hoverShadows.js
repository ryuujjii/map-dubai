import hoverBgLayout from '@/projects/components/content/map/hoverBgLayout';
import hoverHandler from '@/projects/components/content/map/hoverHandler';
import { getPaintedItems, getProjectItem } from '@/projects/components/content/utils';

function getHoverShadowsHandler() {
  const masterplanHoverBgWrapper = getProjectItem("hoverBgs");

  return function hoverShadowsHandler(data) {
    if (!data || !data.length) return;
    getPaintedItems(masterplanHoverBgWrapper, data, hoverBgLayout);
    window.addEventListener("dots-painted", (e) => {
      hoverHandler();
    });
  };
};


const hoverShadowsHandler = getHoverShadowsHandler();

export default hoverShadowsHandler;