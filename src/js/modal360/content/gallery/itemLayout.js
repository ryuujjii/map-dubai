export default function itemLayout(img) {
  return `
    <a data-fancybox="gallery"
      href="${img}">
      <img
        src="${img}"
        loading="lazy" alt="" />
    </a>
  `;
};
