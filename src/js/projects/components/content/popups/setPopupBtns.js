import { getProjectItem, getPaintedItems } from '@/projects/components/content/utils';
import { dispatchCustomEvent } from 'utils';

function getPopupBtnsFn() {
	const popupBtns = getProjectItem('popupBtns');
	return function setPopupBtns(data) {
		paintBtns(popupBtns, data);
		dispatchCustomEvent({ el: window, event: `popupBtns-ready` });
	};
};

function btnsLayout(data) {
	const isAx = data.classNames === 'ax' ? `<img src="${data.img}" alt="" />` : "";
	return `
	<button type="button" class="project__popupBtn popupBtn ${data.classNames}" data-popup-btn="${data.dataPopupId}">
		<div class="popupBtn__container">
			<div class="popupBtn__wrapper">
				<div class="popupBtn__icon">
					<div class="popupBtn__icon-inner">
						${isAx}
								<span class="popupBtn__icon-mask"
									style="mask: url(${data.img}) no-repeat center"></span>
					</div>
				</div>
				<div class="popupBtn__text">${data.text}</div>
			</div>
		</div>
	</button>
  `;
}

function paintBtns(parent, data) {
	parent.innerHTML = '';
	for (var i = 0; i < data.length; i += 2) {
		var parentDiv = '<div class="project__popupBtns-group">';
		var closeDiv = '</div>';
		for (var j = i; j <= i + 1 && j < data.length; j++) {
			var el = data[j];
			parentDiv += btnsLayout(el);
		}
		parentDiv += closeDiv;
		parent.innerHTML += parentDiv;
		parentDiv = '<div class="project__popupBtns-group">';
	}
}
const setPopupBtns = getPopupBtnsFn();

export default setPopupBtns;

