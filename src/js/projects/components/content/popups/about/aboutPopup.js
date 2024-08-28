import { changeText, setAttr } from 'utils';
import aboutItemLayout from '@/projects/components/content/popups/about/aboutItemLayout';
import amenitiesItemLayout from '@/projects/components/content/popups/about/amenitiesItemLayout';
import locationDot from '@/projects/components/content/popups/about/locationDot';

import { getPaintedItems, getProjectItem } from '@/projects/components/content/utils';

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

  return function aboutPopup(content) {
    const { projectName, projectDescription, aboutItems, projectView, amenities, location } = content;
    changeText(aboutEls.projectName, projectName);
    changeText(aboutEls.projectDescription, projectDescription);
    changeText(aboutEls.amenitiesDescription, amenities.text);
    setAttr(aboutEls.projectView, 'src', projectView);
    getPaintedItems(aboutEls.aboutItems, aboutItems, aboutItemLayout);
    getPaintedItems(aboutEls.amenitiesItems, amenities.items, amenitiesItemLayout);
    locationDot(aboutEls.projectLocationDot, location);
  };
};


const aboutPopup = getAboutPopupFn();

export default aboutPopup;