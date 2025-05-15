import hoverTargets from '@/projects/components/content/map/hoverTargets';
import hoverHandler from '@/projects/components/content/map/hoverHandler';
import { getProjectItem } from '@/projects/components/content/utils';
import { isMobileOrTablet } from 'utils';
function getHoverShadowsHandler() {
  const masterplanHoverBgWrapper = getProjectItem("hoverBgs");
  if (isMobileOrTablet()) {
    return function (data) { };
  }
  return function hoverShadowsHandler(data) {
    if (!data || !data.length) return;
    hoverTargets(masterplanHoverBgWrapper, data);
    window.addEventListener("dots-painted", hoverHandler);
  };
};


const hoverShadowsHandler = getHoverShadowsHandler();

export default hoverShadowsHandler;