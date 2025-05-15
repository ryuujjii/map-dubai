export default function paymentPlanLayout(data) {
  return `
  <div class="partner-project__info">
    <p class="partner-project__num">${data.price}</p>
    <p class="partner-project__about">${data.about}</p></div>
  `;
};
