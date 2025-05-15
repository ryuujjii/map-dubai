export default function tabContentLayout(items, dataTabId, isActive) {
  return `
      <div class="payment__tab-pane ${isActive ? "active" : ""}" id="${dataTabId}">
      <div class="payment__info info-payment">
        ${items}
      </div>
    </div>
  `;
};
