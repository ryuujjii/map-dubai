import paymentItemLayout from '@/projects/components/content/popups/payment/layouts/paymentItemLayout';
export default function getPaymentItems(content) {
  let res = "";
  content.forEach((item, i) => {
    res += paymentItemLayout(item);
    if (i !== content.length - 1) {
      res += '<div class="info-payment__stick"></div>';
    }
  });
  return res;
};
