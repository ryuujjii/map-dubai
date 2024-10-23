import { dispatchCustomEvent } from 'utils';
import { addClassToAlter, removeClassToAlter } from '@/modal360/components/alterParentWindow';
import { Fancybox } from "@fancyapps/ui";
export function popups() {
    const popupOpenBtn = document.querySelector(".viewer-btn-floorplan")
    const popup = document.querySelector('.popup')
    const popupInner = document.querySelector('.popup__inner')
    const filter = popup.querySelector(".filter")
    const filterWrap = popup.querySelector(".filter__wrap")
    const filterInner = popup.querySelector(".filter__inner")
    const filterOption = filter.querySelectorAll(".filter__option")
    const filterSelect = filter.querySelectorAll(".filter__select")
    const filterDropdown = filter.querySelectorAll(".filter__dropdown")
    const popupClose = popup.querySelector('.popup__close')
    const viewFullBtn = popup.querySelector('.view-fullbtn')

    filterSelect.forEach((select, i) => {
        select.addEventListener('click', () => {
            switch (i) {
                case 0:
                    filterInner.scrollTo({
                        left: 0,
                        behavior: "smooth"
                    })
                    break;
                case 1:
                    filterInner.scrollTo({
                        left: (filterInner.scrollWidth - filterInner.offsetWidth) / 2,
                        behavior: "smooth"
                    })
                    break;
                case 2:
                    filterInner.scrollTo({
                        left: filterInner.scrollWidth - filterInner.offsetWidth,
                        behavior: "smooth"
                    })
                    break;
            }
            if (!select.classList.contains("alone") && !select.classList.contains("no-type")) {
                if (filterOption[i].classList.contains('active')) {
                    filterOption[i].classList.remove('active')
                } else {
                    filterOption.forEach((option) => {
                        option.classList.remove('active')
                    })
                    filterOption[i].classList.add('active')
                }
            } else {
                filterOption.forEach((option) => {
                    option.classList.remove('active')
                })
            }

        })
    })
    popupInner.addEventListener('click', (e) => {
        if (e.target.closest('.filter__option')) {
            return
        }
        filterOption.forEach((option) => {
            option.classList.remove('active')
        })
    })
    popupOpenBtn.addEventListener('click', () => {
        addClassToAlter()
        popup.classList.add('active')
    })
    popupClose.addEventListener('click', () => {
        popup.classList.remove("active")
        removeClassToAlter()
    })
    const btn = document.querySelector('[data-modal360]');
    btn.addEventListener("click", (e) => {
        dispatchCustomEvent({
            el: window.parent, event: "update-modal360-media", detail: {
                dataModal360: btn.getAttribute('data-modal360')
            }
        });
        popup.classList.remove("active")
        removeClassToAlter()
    });

    Fancybox.bind(`[data-fancybox='view-2d']`, {
        on: {
            initLayout: () => {
                document.body.classList.add('open-floor')
            },
            close: () => {
                document.body.classList.remove('open-floor')
            },
        }


    });

    Fancybox.bind(`[data-fancybox='view-3d']`, {
        on: {
            initLayout: () => {
                document.body.classList.add('open-floor')
            },
            close: () => {
                document.body.classList.remove('open-floor')
            },
        }

    });
}
