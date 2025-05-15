export default function tabBtnLayout(title, dataTabId, isActive) {
  return `
      <button type="button" class="payment__nav-link ${isActive ? "active" : ""}" data-tab="${dataTabId}">
        <span> ${title} </span>
      </button>
  `;
};
