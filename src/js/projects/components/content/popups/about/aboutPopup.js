import { changeText, setAttr } from 'utils';
import getAboutItems from '@/projects/components/content/popups/about/getAboutItems';
import getAmenitiesItems from '@/projects/components/content/popups/about/getAmenitiesItems';

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

  return function aboutPopup({ about }) {
    const { projectName, projectDescription, aboutItems, projectView, amenities, location } = about;
    changeText(aboutEls.projectName, projectName);
    changeText(aboutEls.projectDescription, projectDescription);
    changeText(aboutEls.amenitiesDescription, amenities.description);
    setAttr(aboutEls.projectView, 'src', projectView);
    getAboutItems(aboutEls.aboutItems, aboutItems);
    getAmenitiesItems(aboutEls.amenitiesItems, amenities.items);
    setAttr(aboutEls.projectLocation, 'src', location.map);
  };
};


const aboutPopup = getAboutPopupFn();

export default aboutPopup;