export default function paymentItemLayout(data) {
  return `
      <div class="info-payment__item">
        <div class="info-payment__number"><span class="info-payment__number_number">${data.number}</span><span class="info-payment__number_percent">%</span></div>
        <div class="info-payment__text">${data.text}</div>
      </div>
  `;
};
