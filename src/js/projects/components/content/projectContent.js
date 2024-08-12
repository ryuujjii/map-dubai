import getData from '@/projects/components/content/getData';
import setMap from '@/projects/components/content/setMap';
import setPartnerLogo from '@/projects/components/content/setPartnerLogo';
import paintDots from '@/projects/components/content/dots/paintDots';
import aboutPopup from '@/projects/components/content/popups/about/aboutPopup';
import paymentPopup from '@/projects/components/content/popups/payment/paymentPopup';

export default async function projectContent(projectName) {
  try {
    const { map, dots, partner, popup } = await getData(projectName);
    const { about, payment } = popup;
    setMap(map);
    paintDots(dots);
    setPartnerLogo(partner);
    aboutPopup(about);
    paymentPopup(payment);
  } catch (error) {
    console.log('cannot getData to project', projectName);
    console.log(error);
  }
};
