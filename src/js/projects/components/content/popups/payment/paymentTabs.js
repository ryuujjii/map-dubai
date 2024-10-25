import getTabsContent from '@/projects/components/content/popups/payment/getTabsContent';
import getPaymentBtns from '@/projects/components/content/popups/payment/getPaymentBtns';
import { getProjectItem, getHandleClassNames } from '@/projects/components/content/utils';

function getPaymentTabsFn() {
  const paymentTabsEls = {
    paymentTabs: getProjectItem('paymentTabs'),
    paymentTabsNav: getProjectItem('paymentTabsNav'),
    paymentTabsContent: getProjectItem('paymentTabsContent'),
  };
  const paymentTabsClassNames = getHandleClassNames(paymentTabsEls.paymentTabs);

  return function paymentTabs(data) {
    getTabsContent(paymentTabsEls.paymentTabsContent, data.content);
    getPaymentBtns(paymentTabsEls.paymentTabsNav, data.content);
    paymentTabsClassNames(data.classNames);
  };
};

const paymentTabs = getPaymentTabsFn();
export default paymentTabs;

