export default function developerDescriptionLayout(data) {
  return `
          <p class="${data.classNames}">
						${data.text}
					</p>
  `;
};
