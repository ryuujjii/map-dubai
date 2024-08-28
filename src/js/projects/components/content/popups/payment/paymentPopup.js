import getPaymentItems from '@/projects/components/content/popups/payment/getPaymentItems';
import desctriptionLayout from '@/projects/components/content/popups/payment/desctriptionLayout';
import { getPaintedItems, getProjectItem, getHandleClassNames } from '@/projects/components/content/utils';

function getPaymentPopupFn() {
  const paymentEls = {
    paymentItems: getProjectItem('paymentItems'),
    paymentDescriptions: getProjectItem('paymentDescriptions'),
  };
  const itemshandleClassNames = getHandleClassNames(paymentEls.paymentItems);
  const descriptionshandleClassNames = getHandleClassNames(paymentEls.paymentDescriptions);

  return function paymentPopup({ items, descriptions }) {
    getPaymentItems(paymentEls.paymentItems, items.content);
    getPaintedItems(paymentEls.paymentDescriptions, descriptions.content, desctriptionLayout);
    itemshandleClassNames(items.classNames);
    descriptionshandleClassNames(descriptions.classNames);
  };
};
const paymentPopup = getPaymentPopupFn();

export default paymentPopup;