import { changeText, setAttr } from 'utils';
import aboutItemLayout from '@/projects/components/content/popups/about/aboutItemLayout';
import amenitiesItemLayout from '@/projects/components/content/popups/about/amenitiesItemLayout';
import locationDot from '@/projects/components/content/popups/about/locationDot';

import { getPaintedItems, getProjectItem, getHandleClassNames } from '@/projects/components/content/utils';

function getAboutPopupFn() {
  const aboutEls = {
    projectName: getProjectItem('projectName'),
    projectDescription: getProjectItem('projectDescription'),
    aboutItems: getProjectItem('aboutItems'),
    projectView: getProjectItem('projectView'),
    amenitiesDescription: getProjectItem('amenitiesDescription'),
    amenitiesItems: getProjectItem('amenitiesItems'),
    projectLocationDot: getProjectItem('projectLocationDot'),
  };
  const aboutItemsHandleClassNames = getHandleClassNames(aboutEls.aboutItems);
  // const amenitiesItemsHandleClassNames = getHandleClassNames(aboutEls.amenitiesItems);
  // const projectViewHandleClassNames = getHandleClassNames(aboutEls.projectView);

  return function aboutPopup(content) {
    const { projectName, projectDescription, aboutItems, projectView, amenities, location } = content;
    changeText(aboutEls.projectName, projectName);
    changeText(aboutEls.projectDescription, projectDescription);
    changeText(aboutEls.amenitiesDescription, amenities.text);
    setAttr(aboutEls.projectView, 'src', projectView.img);
    getPaintedItems(aboutEls.aboutItems, aboutItems.content, aboutItemLayout);
    getPaintedItems(aboutEls.amenitiesItems, amenities.items.content, amenitiesItemLayout);
    locationDot(aboutEls.projectLocationDot, location);
    aboutItemsHandleClassNames(aboutItems.classNames)
    // amenitiesItemsHandleClassNames(amenities.items.classNames)
    // projectViewHandleClassNames(projectView.classNames)
  };
};


const aboutPopup = getAboutPopupFn();

export default aboutPopup;