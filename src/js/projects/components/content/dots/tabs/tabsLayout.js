export default function tabsLayout(data) {
  return `
    <button type="button" class="masterplan__nav-link" data-modal360-tab="${data.dataModal360Tab}">
		<span>${data.title}</span>
	</button>
  `
};
