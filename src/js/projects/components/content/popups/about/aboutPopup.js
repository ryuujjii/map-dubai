import { changeText, setAttr } from 'utils';
import aboutItemLayout from '@/projects/components/content/popups/about/aboutItemLayout';
import amenitiesItemLayout from '@/projects/components/content/popups/about/amenitiesItemLayout';

import { getPaintedItems } from '@/projects/components/content/utils';

function getAboutPopupFn() {
  const aboutEls = {
    projectName: document.querySelector('[data-project="projectName"]'),
    projectDescription: document.querySelector('[data-project="projectDescription"]'),
    aboutItems: document.querySelector('[data-project="aboutItems"]'),
    projectView: document.querySelector('[data-project="projectView"]'),
    amenitiesDescription: document.querySelector('[data-project="amenitiesDescription"]'),
    amenitiesItems: document.querySelector('[data-project="amenitiesItems"]'),
    projectLocation: document.querySelector('[data-project="projectLocation"]'),
  };

  return function aboutPopup(content) {
    const { projectName, projectDescription, aboutItems, projectView, amenities, location } = content;
    changeText(aboutEls.projectName, projectName);
    changeText(aboutEls.projectDescription, projectDescription);
    changeText(aboutEls.amenitiesDescription, amenities.description);
    setAttr(aboutEls.projectView, 'src', projectView);
    getPaintedItems(aboutEls.aboutItems, aboutItems, aboutItemLayout);
    getPaintedItems(aboutEls.amenitiesItems, amenities.items, amenitiesItemLayout);
    setAttr(aboutEls.projectLocation, 'src', location.map);
  };
};


const aboutPopup = getAboutPopupFn();

export default aboutPopup;