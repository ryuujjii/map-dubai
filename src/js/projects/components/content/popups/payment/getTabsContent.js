import getPaymentItems from '@/projects/components/content/popups/payment/getPaymentItems';
import tabContentLayout from '@/projects/components/content/popups/payment/layouts/tabContentLayout';

export default function getTabsContent(parent, data) {
  parent.innerHTML = "";
  data.forEach((tabContent, i) => {
    parent.innerHTML += tabContentLayout(getPaymentItems(tabContent.content), `tab${i + 1}`, tabContent.isActive);
  });
};