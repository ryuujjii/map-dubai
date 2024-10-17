export default function dotsLayout(data) {
  return `
  <g 
  class="hover-g"
  ${data.info.hoverId ? `data-hover-id="${data.info.hoverId}"` : ''} 
  data-modal360="${data.info.dataModal360}" 
  ${data.info.dataModal360Category ? `data-modal360-category="${data.info.dataModal360Category}"` : ''} 
  >
      <foreignObject
      width="${data.sizes.width}"
      height="${data.sizes.height}"
      x="${data.position.x}"
      y="${data.position.y}"
      class="project-dot"
    >
      <button
        type="button"
        class="project__dot dot-project ${data.info.classNames}"
      >
        <div class="dot-project__container">
          <div class="dot-project__wrapper">
            <div class="dot-project__info">
              <div class="dot-project__title">${data.info.title}</div>
              <div class="dot-project__type">${data.info.type}</div>
            </div>
            <div class="dot-project__icon-wrapper">
              <div
                class="dot-project__icon"
                >
                <!-- style="--mask-image: url('${data.info.icon}')" -->
            <img src="${data.info.icon}" alt="">
          </div>
            </div>
          </div>
          <div
            class="dot-project__tail"
            >
            <!-- style="--tail-image: url('${data.info.tail}')" -->
            <span>
            <img src="${data.info.tail}" alt="">
            </span>
          </div>
        </div>
      </button>
    </foreignObject>
    </g>
  `;
};
