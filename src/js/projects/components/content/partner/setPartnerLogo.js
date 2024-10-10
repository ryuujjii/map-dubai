import imgLoader from '@/projects/components/content/imgLoader';
import { getProjectItem, getHandleClassNames, getPaintedItems } from '@/projects/components/content/utils';
import paymentPlanLayout from '@/projects/components/content/partner/paymentPlanLayout';

function getSetPartnerLogoFn() {
  const partnerEls = {
    partnerLogoParent: getProjectItem("partnerLogoParent"),
    partnerLogo: getProjectItem("logo"),
    partnerInfo: getProjectItem("partnerInfo"),
  };
  // const handleClassNames = getHandleClassNames(partnerEls.partnerLogoParent);
  imgLoader(partnerEls.partnerLogo);
  return function setPartnerLogo({ logo, classNames, info }) {
    // handleClassNames(classNames);
    partnerEls.partnerLogo.setAttribute('src', logo);
    getPaintedItems(partnerEls.partnerInfo, info, paymentPlanLayout);
  };
};

const setPartnerLogo = getSetPartnerLogoFn();

export default setPartnerLogo;
