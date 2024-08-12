import getPaymentItems from '@/projects/components/content/popups/payment/getPaymentItems';
import desctriptionLayout from '@/projects/components/content/popups/payment/desctriptionLayout';
import { getPaintedItems } from '@/projects/components/content/utils';
function getPaymentPopupFn() {
  const paymentEls = {
    paymentItems: document.querySelector('[data-project="paymentItems"]'),
    paymentDescriptions: document.querySelector('[data-project="paymentDescriptions"]'),
  };
  return function paymentPopup({ items, descriptions }) {
    getPaymentItems(paymentEls.paymentItems, items);
    getPaintedItems(paymentEls.paymentDescriptions, descriptions, desctriptionLayout);
  };
};
const paymentPopup = getPaymentPopupFn();

export default paymentPopup;