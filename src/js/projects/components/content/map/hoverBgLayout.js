export default function hoverBgLayout({ id, img }) {
  return `
      	<img class="masterplan__hover-bg" data-hover-target="${id}"  src="${img}" alt="hover-bg" />
  `;
};
