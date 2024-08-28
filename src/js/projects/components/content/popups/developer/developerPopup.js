import { setAttr } from 'utils';
import developerItemsLayout from '@/projects/components/content/popups/developer/developerItemsLayout';
import developerDescriptionLayout from '@/projects/components/content/popups/developer/developerDescriptionLayout';

import { getPaintedItems, getProjectItem, getHandleClassNames } from '@/projects/components/content/utils';

function getDeveloperPopup() {
  const developerEls = {
    developerDescriptions: getProjectItem('developerDescriptions'),
    developerImg: getProjectItem('developerImg'),
    developerLogo: getProjectItem('developerLogo'),
    developerMedia: getProjectItem('developerMedia'),
    developerItems: getProjectItem('developerItems'),
  };
  const developerMediaHandleClassNames = getHandleClassNames(developerEls.developerMedia);
  const developerItemsHandleClassNames = getHandleClassNames(developerEls.developerItems);
  // const developerDescriptionsClassNames = getHandleClassNames(developerEls.developerDescriptions);

  return function developerPopup(content) {
    const { descriptions, items, media } = content;
    setAttr(developerEls.developerLogo, 'src', media.projectlogo);
    setAttr(developerEls.developerImg, 'src', media.img);
    getPaintedItems(developerEls.developerItems, items.content, developerItemsLayout);
    getPaintedItems(developerEls.developerDescriptions, descriptions.content, developerDescriptionLayout);
    developerMediaHandleClassNames(media.classNames);
    developerItemsHandleClassNames(items.classNames);
    // developerDescriptionsClassNames(descriptions.classNames);
  };
};


const developerPopup = getDeveloperPopup();

export default developerPopup;