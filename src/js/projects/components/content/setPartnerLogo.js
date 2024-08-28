import imgLoader from '@/projects/components/content/imgLoader';
import { getProjectItem, getHandleClassNames } from '@/projects/components/content/utils';

function getSetPartnerLogoFn() {
  const partnerEls = {
    partnerLogoParent: getProjectItem("partnerLogoParent"),
    partnerLogo: getProjectItem("logo"),
  };
  // const handleClassNames = getHandleClassNames(partnerEls.partnerLogoParent);
  imgLoader(partnerEls.partnerLogo);
  return function setPartnerLogo({ logo, classNames }) {
    // handleClassNames(classNames);
    partnerEls.partnerLogo.setAttribute('src', logo);
  };
};

const setPartnerLogo = getSetPartnerLogoFn();

export default setPartnerLogo;
