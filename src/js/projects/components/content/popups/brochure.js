import { setAttr } from 'utils';
import imgLoader from '@/projects/components/content/imgLoader';
import { getProjectItem, getHandleClassNames } from '@/projects/components/content/utils';

function getBrochurePopupFn() {
  const brochureEls = {
    brochureImg: getProjectItem('brochureImg'),
    brochure: getProjectItem('brochure'),
  };
  const handleClassNames = getHandleClassNames(brochureEls.brochure);

  imgLoader(brochureEls.brochureImg);
  return function brochurePopup({ brochureImg, classNames }) {
    setAttr(brochureEls.brochureImg, "src", brochureImg);
    handleClassNames(classNames)
  };
}

const brochurePopup = getBrochurePopupFn();

export default brochurePopup;