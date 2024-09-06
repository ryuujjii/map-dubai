import tabBtnLayout from '@/projects/components/content/popups/payment/layouts/tabBtnLayout';
import tabPayment from "@/projects/components/popup/tabPayment";
import { addClassName, removeClassName } from 'utils';
export default function getPaymentBtns(parent, data) {
  parent.innerHTML = "";
  if (data.length > 1) {
    removeClassName(parent, "payment__nav-none");
    data.forEach((tabContent, i) => {
      parent.innerHTML += tabBtnLayout(tabContent.title, `tab${i + 1}`, tabContent.isActive);
    });
    tabPayment();
  } else {
    addClassName(parent, "payment__nav-none");
  }
};
