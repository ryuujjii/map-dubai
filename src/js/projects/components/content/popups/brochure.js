import { setAttr } from 'utils';
import imgLoader from '@/projects/components/content/imgLoader';
import { getProjectItem } from '@/projects/components/content/utils';

function getBrochurePopupFn() {
  const brochureEls = {
    brochureImg: getProjectItem('brochureImg'),
  };
  imgLoader(brochureEls.brochureImg);
  return function brochurePopup({ brochureImg }) {
    setAttr(brochureEls.brochureImg, "src", brochureImg);
  };
}

const brochurePopup = getBrochurePopupFn();

export default brochurePopup;