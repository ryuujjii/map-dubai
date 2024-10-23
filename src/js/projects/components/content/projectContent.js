import getData from '@/projects/components/content/getData';
import setMap from '@/projects/components/content/map/setMap';
import setPartnerLogo from '@/projects/components/content/partner/setPartnerLogo';
import paintDots from '@/projects/components/content/dots/paintDots';
import aboutPopup from '@/projects/components/content/popups/about/aboutPopup';
import paymentPopup from '@/projects/components/content/popups/payment/paymentPopup';
import developerPopup from '@/projects/components/content/popups/developer/developerPopup';
import scrollPopupToTop from '@/projects/components/content/scrollPopupToTop';
import brochurePopup from '@/projects/components/content/popups/brochure';
import { getDataToModal360, sendFloorplansToModal360 } from '@/projects/components/content/getDataToModal360';
import dotsTabs from '@/projects/components/content/dots/tabs/dotsTabs';
import { addClassName, removeClassName } from 'utils';
import setPopupBtns from '@/projects/components/content/popups/setPopupBtns';
export default async function projectContent(projectName) {
  try {
    const { info, map, dots, partner, popup, modal360 } = await getData(projectName);
    const { about, payment, developer, brochure, popupBtns } = popup;
    !info.withMap ? addClassName(document.body, "clear-project") : removeClassName(document.body, "clear-project");
    setPopupBtns(popupBtns);
    setMap(map);
    paintDots(dots);
    dotsTabs(map?.dotsTabs);
    setPartnerLogo(partner);
    aboutPopup(about);
    paymentPopup(payment);
    developerPopup(developer);
    brochurePopup(brochure);
    scrollPopupToTop();
    getDataToModal360(modal360);
    sendFloorplansToModal360();
  } catch (error) {
    console.log('cannot getData to project', projectName);
    console.log(error);
  }
};
