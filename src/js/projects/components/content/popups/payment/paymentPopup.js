import paymentTabs from '@/projects/components/content/popups/payment/paymentTabs';
import desctriptionLayout from '@/projects/components/content/popups/payment/layouts/desctriptionLayout';
import { getPaintedItems, getProjectItem, getHandleClassNames } from '@/projects/components/content/utils';

function getPaymentPopupFn() {
  const paymentEls = {
    paymentDescriptions: getProjectItem('paymentDescriptions'),
  };
  // const descriptionshandleClassNames = getHandleClassNames(paymentEls.paymentDescriptions);

  return function paymentPopup({ items, descriptions }) {
    paymentTabs(items)
    getPaintedItems(paymentEls.paymentDescriptions, descriptions.content, desctriptionLayout);
    // descriptionshandleClassNames(descriptions.classNames);
  };
};
const paymentPopup = getPaymentPopupFn();

export default paymentPopup;