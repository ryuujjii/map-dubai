import { removeClassName, addClassName } from 'utils';
import showActiveDots from '@/projects/components/content/dots/tabs/showActiveDots';
import { getPaintedItems } from '@/projects/components/content/utils';
import tabsLayout from '@/projects/components/content/dots/tabs/tabsLayout';

function getDotsTabs() {
	let activeTab = null;
	const nav = document.querySelector('.masterplan__nav');

	return function dotsTabs(data) {
		removeClassName(document.body, "dots-tabs-active");
		if (!data) return;
		addClassName(document.body, "dots-tabs-active");
		getPaintedItems(nav, Object.values(data), tabsLayout);

		const tabLinks = document.querySelectorAll(".masterplan__nav-link");
		showActiveDots(tabLinks[0], activeTab);
		addClassName(tabLinks[0]);

		activeTab = tabLinks[0];

		tabLinks.forEach(btn => {
			btn.addEventListener("click", () => {
				removeClassName(activeTab);
				addClassName(btn);
				showActiveDots(btn, activeTab);
				activeTab = btn;
			});
		});
	};
}

const dotsTabs = getDotsTabs();

export default dotsTabs;