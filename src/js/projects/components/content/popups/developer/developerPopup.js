import { setAttr } from 'utils';
import developerItemsLayout from '@/projects/components/content/popups/developer/developerItemsLayout';
import developerDescriptionLayout from '@/projects/components/content/popups/developer/developerDescriptionLayout';

import { getPaintedItems, getProjectItem } from '@/projects/components/content/utils';

function getDeveloperPopup() {
  const developerEls = {
    developerDescriptions: getProjectItem('developerDescriptions'),
    developerImg: getProjectItem('developerImg'),
    developerLogo: getProjectItem('developerLogo'),
    developerItems: getProjectItem('developerItems'),
  };

  return function developerPopup(content) {
    const { descriptions, items, media } = content;
    setAttr(developerEls.developerLogo, 'src', media.projectlogo);
    setAttr(developerEls.developerImg, 'src', media.img);
    getPaintedItems(developerEls.developerItems, items, developerItemsLayout);
    getPaintedItems(developerEls.developerDescriptions, descriptions, developerDescriptionLayout);
  };
};


const developerPopup = getDeveloperPopup();

export default developerPopup;