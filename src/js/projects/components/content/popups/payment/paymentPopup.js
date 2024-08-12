import getPaymentItems from '@/projects/components/content/popups/payment/getPaymentItems';
import desctriptionLayout from '@/projects/components/content/popups/payment/desctriptionLayout';
import { getPaintedItems, getProjectItem } from '@/projects/components/content/utils';
function getPaymentPopupFn() {
  const paymentEls = {
    paymentItems: getProjectItem('paymentItems'),
    paymentDescriptions: getProjectItem('paymentDescriptions'),
  };
  return function paymentPopup({ items, descriptions }) {
    getPaymentItems(paymentEls.paymentItems, items);
    getPaintedItems(paymentEls.paymentDescriptions, descriptions, desctriptionLayout);
  };
};
const paymentPopup = getPaymentPopupFn();

export default paymentPopup;