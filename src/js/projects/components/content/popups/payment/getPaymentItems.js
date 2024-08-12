import paymentItemLayout from '@/projects/components/content/popups/payment/paymentItemLayout';
export default function getPaymentItems(parent, content) {
  parent.innerHTML = '';
  content.forEach((item, i) => {
    parent.innerHTML += paymentItemLayout(item);
    if (i !== content.length - 1) {
      parent.innerHTML += '<div class="info-payment__stick"></div>';
    }
  });
};
