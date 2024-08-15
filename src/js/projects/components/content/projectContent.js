import getData from '@/projects/components/content/getData';
import setMap from '@/projects/components/content/setMap';
import setPartnerLogo from '@/projects/components/content/setPartnerLogo';
import paintDots from '@/projects/components/content/dots/paintDots';
import aboutPopup from '@/projects/components/content/popups/about/aboutPopup';
import paymentPopup from '@/projects/components/content/popups/payment/paymentPopup';
import developerPopup from '@/projects/components/content/popups/developer/developerPopup';
import scrollPopupToTop from '@/projects/components/content/scrollPopupToTop';
import { getDataToModal360 } from '@/projects/components/content/getDataToModal360';

export default async function projectContent(projectName) {
  try {
    const { map, dots, partner, popup, modal360 } = await getData(projectName);
    const { about, payment, developer } = popup;
    setMap(map);
    paintDots(dots);
    setPartnerLogo(partner);
    aboutPopup(about);
    paymentPopup(payment);
    developerPopup(developer);
    scrollPopupToTop();
    getDataToModal360(modal360);
  } catch (error) {
    console.log('cannot getData to project', projectName);
    console.log(error);
  }
};
